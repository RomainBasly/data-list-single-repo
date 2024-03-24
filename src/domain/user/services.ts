import { inject, injectable } from 'tsyringe';
import { RoleAssignments, Roles } from '../../common/types/api';
import { AppUserRepository } from '../../infrastructure/database/repositories/AppUserRepository';
import {
  AuthenticationError,
  ErrorMessages,
  FailToGenerateTokens,
  UserAlreadyExistsError,
  UserDoNotExists,
} from '../common/errors';
import { TokenService } from '../jwtToken/services';
import { PasswordService } from '../password/services';
import { User } from './types';

@injectable()
export class UserService {
  constructor(
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository,
    @inject(PasswordService) private readonly passwordService: PasswordService,
    @inject(TokenService) private readonly tokenService: TokenService
  ) {}

  async registerUser(user_id: number, userName: string, email: string, password: string) {
    try {
      const hashedPassword = await this.passwordService.hashPassword(password);
      const user = { user_id, userName, email, roles: { [Roles.USER]: true }, password: hashedPassword };
      await this.userRepository.addPassword(user);
    } catch (error) {
      console.error('something went wrong in the userservice', error);
      throw error;
    }
  }

  public async login(
    email: string,
    passwordInput: string
  ): Promise<{ accessToken: string; refreshToken: string; id: number }> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new UserDoNotExists(ErrorMessages.NOT_EXISTING_USER);
      }
      const passwordFromDB = user.password;
      const passwordMatchDB = await this.passwordService.checkCredentials(passwordInput, passwordFromDB);

      if (!passwordMatchDB) {
        throw new AuthenticationError(ErrorMessages.INVALID_CREDENTIALS);
      }
      const roles = this.addUserRole(user);
      const accessToken = this.tokenService.generateAccessToken({
        userInfo: { id: user.user_id, roles },
      });
      const refreshToken = this.tokenService.generateRefreshToken({ email });
      if (!refreshToken || !accessToken) {
        throw new FailToGenerateTokens(ErrorMessages.FAIL_TO_GENERATE_TOKENS);
      }
      await this.userRepository.updateRefreshToken(refreshToken, email);
      return { accessToken, refreshToken, id: user.user_id };
    } catch (error) {
      console.error('something went wrong in the service', error);
      throw error;
    }
  }

  public async logoutUser(refreshToken: string) {
    const foundUser = await this.userRepository.findUserByRefreshToken(refreshToken);
    if (!foundUser) return false;
    await this.userRepository.clearUserRefreshToken(refreshToken);
    return true;
  }

  public addUserRole(user: User) {
    const defaultRole: RoleAssignments = { [Roles.USER]: true };
    const userRolesFromDB = user.roles as RoleAssignments;
    return { ...defaultRole, ...userRolesFromDB };
  }
}

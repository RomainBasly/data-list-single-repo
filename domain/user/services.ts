import { inject, injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../src/common/types/api";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import {
  AuthenticationError,
  ErrorMessages,
  FailToGenerateTokens,
  UserAlreadyExistsError,
  UserDoNotExists,
} from "../common/errors";
import { AuthService } from "../authentication/services";

@injectable()
export class UserService {
  constructor(
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository,
    @inject(AuthService) private readonly authService: AuthService
  ) {}

  async registerUser(email: string, password: string) {
    const checkIfUserExists = await this.userRepository.getUser(email);
    if (checkIfUserExists.data && checkIfUserExists.data.length > 0) {
      throw new UserAlreadyExistsError(ErrorMessages.ALREADY_EXISTS);
    }
    try {
      const hashedPassword = await this.authService.hashPassword(password);
      const newUser = { email: email, roles: { [Roles.USER]: true }, password: hashedPassword };
      await this.userRepository.create(newUser);
    } catch (error) {
      console.error("something went wrong in the service", error);
      throw error;
    }
  }

  public async login(email: string, passwordInput: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const dbQuery = await this.userRepository.getUser(email);
      if (!dbQuery || !dbQuery.data) {
        throw new UserDoNotExists(ErrorMessages.NOT_EXISTING_USER);
      }
      const user = dbQuery.data[0];
      const passwordFromDB = user.password;
      const passwordMatchDB = await this.authService.checkCredentials(passwordInput, passwordFromDB);

      if (!passwordMatchDB) {
        throw new AuthenticationError(ErrorMessages.INVALID_CREDENTIALS);
      }
      const roles = this.addUserRole(user);
      const accessToken = this.authService.generateAccessToken({
        userInfo: { email, roles },
      });
      const refreshToken = this.authService.generateRefreshToken({ email });
      if (!refreshToken || !accessToken) {
        throw new FailToGenerateTokens(ErrorMessages.FAIL_TO_GENERATE_TOKENS);
      }
      await this.userRepository.updateRefreshToken(refreshToken, email);
      return { accessToken, refreshToken };
    } catch (error) {
      console.error("something went wrong in the service", error);
      throw error;
    }
  }

  public async logoutUser(refreshToken: string) {
    const foundUser = await this.userRepository.findUserByRefreshToken(refreshToken);
    if (!foundUser) return false;
    await this.userRepository.clearUserRefreshToken(refreshToken);
    return true;
  }

  public addUserRole(user: any) {
    const defaultRole: RoleAssignments = { [Roles.USER]: true };
    const userRolesFromDB = user.roles as RoleAssignments;
    return { ...defaultRole, ...userRolesFromDB };
  }
}

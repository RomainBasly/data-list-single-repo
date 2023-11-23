import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { Roles } from "../../src/common/types/api";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import { ErrorMessages, UserAlreadyExistsError } from "../common/errors";

@injectable()
export class UserService {
  constructor(@inject(AppUserRepository) private readonly userRepository: AppUserRepository) {}

  async registerNewUser(email: string, password: string) {
    if (await this.userRepository.userAlreadyExists(email)) {
      throw new UserAlreadyExistsError(ErrorMessages.ALREADY_EXISTS);
    }
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { email: email, roles: { [Roles.USER]: true }, password: hashedPassword };
      await this.userRepository.create(newUser);
    } catch (error) {
      console.error("something went wrong in the service", error);
      throw error;
    }
  }
}

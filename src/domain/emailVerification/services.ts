import { injectable, inject } from 'tsyringe';
import { AppEmailVerificationTokenRepository } from '../../infrastructure/database/repositories/AppEmailVerificationToken';

export interface CodeVerificationPayload {
  email: string;
  code: string;
}

@injectable()
export default class EmailVerificationServices {
  constructor(
    @inject(AppEmailVerificationTokenRepository)
    private readonly appEmailVerificationTokenRepository: AppEmailVerificationTokenRepository
  ) {}
  public async verifyCode(payload: CodeVerificationPayload) {
    const { email, code } = payload;
    const response = await this.appEmailVerificationTokenRepository.getAppEmailVerificationRecord(email);
    console.log('response', response);
  }
}

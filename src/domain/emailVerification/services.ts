import { injectable, inject } from 'tsyringe';

export interface CodeVerificationPayload {
  email: string;
  code: string;
}

@injectable()
export default class EmailVerificationServices {
  public async verifyCode(payload: CodeVerificationPayload) {}
}

'use strict';
import nodeMailer from 'nodemailer';
import { emailConfig, mailtrapConfig } from '../../config/email';
import { inject, injectable } from 'tsyringe';
import ejs from 'ejs';
import path from 'path';
import { AppEmailVerificationTokenRepository } from '../database/repositories/AppEmailVerificationToken';

@injectable()
export default class NodeMailerService {
  private logoUrlPath: string = process.env.LOGO_URL_PATH ?? '';

  public constructor(
    @inject(AppEmailVerificationTokenRepository)
    private readonly appEmailVerificationTokenRepository: AppEmailVerificationTokenRepository
  ) {}
  private transporter = nodeMailer.createTransport({
    ...mailtrapConfig,
  });

  async sendEmail(email: string) {
    const code = await this.generateAndPublishCode(email);
    try {
      console.log('mailTrapConfig', mailtrapConfig);
      console.log('email config', emailConfig);
      await this.transporter.sendMail({
        ...emailConfig,
        to: email,
        html: await this.generateHtml(code, this.logoUrlPath),
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async generateAndPublishCode(email: string) {
    let verificationCode: string = '';

    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      verificationCode += randomNumber.toString();
    }
    const expiryDate = new Date(Date.now() + 3600 * 24 * 1000);
    const formattedDate = expiryDate.toISOString();

    await this.appEmailVerificationTokenRepository.registerToDB(email, verificationCode, formattedDate);
    return verificationCode;
  }

  async generateHtml(code: string, logoUrlPath: string) {
    try {
      return await ejs.renderFile(path.join(__dirname, 'emailTemplate.ejs'), {
        code,
        logoUrlPath,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

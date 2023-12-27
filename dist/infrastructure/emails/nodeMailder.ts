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
    await this.transporter.sendMail({
      ...emailConfig,
      to: email,
      html: await this.generateHtml(code, this.logoUrlPath),
    });
  }

  private async generateAndPublishCode(email: string) {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const expiryDate = new Date(Date.now() + 3600 * 24 * 1000);
    const formattedDate = expiryDate.toISOString();

    await this.appEmailVerificationTokenRepository.registerToDB(email, randomNumber, formattedDate);
    return randomNumber;
  }
  async generateHtml(code: number, logoUrlPath: string) {
    return await ejs.renderFile(path.join(__dirname, 'emailTemplate.ejs'), {
      code,
      logoUrlPath,
    });
  }
}

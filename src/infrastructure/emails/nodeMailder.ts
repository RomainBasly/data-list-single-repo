'use strict';
import nodeMailer from 'nodemailer';
import { EMAILSUBJECT, emailConfig as emailConfig, mailtrapConfig } from '../../config/email';
import { inject, injectable } from 'tsyringe';
import ejs from 'ejs';
import path from 'path';
import { AppEmailVerificationTokenRepository } from '../database/repositories/AppEmailVerificationTokenRepository';

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

  private async generateHtml(code: string, logoUrlPath: string, isWelcomeEmail: boolean) {
    try {
      const emailTemplate = isWelcomeEmail ? 'emailTemplateWelcome.ejs' : 'emailTemplateListInvitation.js';
      return await ejs.renderFile(path.join(__dirname, emailTemplate), {
        code,
        logoUrlPath,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendVerifyCodeEmail(email: string) {
    const code = await this.generateAndPublishCode(email);
    try {
      await this.transporter.sendMail({
        ...emailConfig,
        subject: EMAILSUBJECT.WELCOME,
        to: email,
        html: await this.generateHtml(code, this.logoUrlPath, true),
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
}

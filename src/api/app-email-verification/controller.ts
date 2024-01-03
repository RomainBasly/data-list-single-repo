import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import AppEmailValidation from '../../domain/emailVerification/validation';
import NodeMailerService from '../../infrastructure/emails/nodeMailder';

const apiKey = process.env.MAILCHIMP_API_KEY;

@injectable()
export class AppEmailVerificationController {
  constructor(
    private readonly appEmailValidation: AppEmailValidation,
    @inject(NodeMailerService) private readonly nodeMailerService: NodeMailerService
  ) {}

  public async sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body;
    try {
      const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
      await this.nodeMailerService.sendEmail(verifiedEmailObject.email);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log('error get in the controller', error);
      next(error);
    }
  }

  public async verifyCode(req: Request, res: Response, next: NextFunction) {
    const { email, code } = req.body;

    try {
      const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
      const verifiedCodeObject = await this.appEmailValidation.validateCode(code);
    } catch (error) {}
  }
}

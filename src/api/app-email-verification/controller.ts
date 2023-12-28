import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import AppEmailValidation from '../../domain/email/validation';
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
      const verifiedObject = await this.appEmailValidation.validateEmail(email);
      console.log('verifiedObject', verifiedObject);
      await this.nodeMailerService.sendEmail(verifiedObject.email);
      res.sendStatus(200);
    } catch (error) {
      console.log('error get in the controller', error);
      next(error);
    }
  }
}

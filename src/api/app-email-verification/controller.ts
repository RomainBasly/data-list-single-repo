import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import AppEmailValidation from "../../domain/email/validation";
import NodeMailerService from "../../infrastructure/emails/nodeMailder";

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
      await this.nodeMailerService.sendEmail(verifiedObject.email);
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import AppEmailValidation from "../../domain/email/validation";

const apiKey = process.env.MAILCHIMP_API_KEY;

@injectable()
export class AppEmailVerificationController {
  constructor(private readonly appEmailValidation: AppEmailValidation) {}

  public async sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body;
    try {
      const verifiedEmail = await this.appEmailValidation.validateEmail(email);
    } catch (error) {
      next(error);
    }
  }
}

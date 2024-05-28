import { injectable } from 'tsyringe';
import * as yup from 'yup';
import { ErrorMessages, ValidationError } from '../common/errors';
import { List } from './types';
import AppEmailValidation from '../emailVerification/validation';

@injectable()
export class ListValidatorService {
  public constructor(private readonly appEmailValidation: AppEmailValidation) {}

  public async preCheck(inputs: List) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      accessLevel: yup.string().required(),
      creatorEmail: yup.string().required(),
      creatorUserName: yup.string().required(),
      emails: yup.array().of(yup.string().required()),
      description: yup.string().optional(),
      cyphered: yup.boolean().optional(),
      creatorId: yup.number().required(),
      thematic: yup.string().required(),
    });

    try {
      return await schema.validate(inputs);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new ValidationError(ErrorMessages.VALIDATION_ERROR, error.message);
      }
      throw new Error('Error validating the list schema during precheck');
    }
  }

  public async validateEmails(emails: string[] | undefined) {
    let emailsAddress: string[] = [];
    if (emails) {
      await Promise.all(
        emails.map(async (email) => {
          const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
          emailsAddress.push(verifiedEmailObject.email);
        })
      );
    }
    return emailsAddress.length > 0 ? emailsAddress : [];
  }
}

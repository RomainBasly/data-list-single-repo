import { injectable } from 'tsyringe';
import * as yup from 'yup';
import { ErrorMessages, ValidationError } from '../common/errors';
import { List } from './types';

@injectable()
export class CreateListValidatorService {
  public constructor() {}

  public async preCheck(inputs: List) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      accessLevel: yup.string().required(),
      creatorEmail: yup.string().required(),
      emails: yup.array().of(yup.string().required()),
      description: yup.string().optional(),
      cyphered: yup.string().optional(),
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
}

import { inject, injectable } from "tsyringe";
import * as yup from "yup";
import { ErrorMessages, ValidationError } from "../common/errors";

@injectable()
export default class AppEmailValidation {
  public async validateEmail(input: string): Promise<{ email: string }> {
    const schema = yup.object().shape({
      email: yup.string().email("Email format invalid").required("Email is required"),
    });
    try {
      return await schema.validate(input);
    } catch (error) {
      if (error instanceof yup.ValidationError)
        throw new ValidationError(ErrorMessages.VALIDATION_ERROR, error.message);
      throw new Error("Email validating the email");
    }
  }
}

import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { ErrorMessages, UserAlreadyExistsError } from '../../../domain/common/errors';

export interface IVerificationCode {
  email: string;
  code: string;
  expiry_date: string;
}

@injectable()
export class AppEmailVerificationTokenRepository {
  public async registerToDB(email_address: string, verification_code: string, formatted_expiry_date: string) {
    const { error } = await supabase.rpc('set_verification_code_into_DB', {
      email_address,
      verification_code,
      formatted_expiry_date,
    });

    if (error) {
      if (error.code === 'P0001') {
        throw new UserAlreadyExistsError(ErrorMessages.ALREADY_EXISTING);
      }
    } else {
      console.log('user registration started');
    }
  }

  public async verifyCodeFromDB(email_address: string, verification_code: string): Promise<IVerificationCode> {
    const { data, error } = await supabase.rpc('get_verification_code_data', {
      email_address,
      verification_code,
    });
    return data;
  }
}

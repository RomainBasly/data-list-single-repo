import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { ErrorMessages, UserAlreadyExistsError } from '../../../domain/common/errors';

@injectable()
export class AppEmailVerificationTokenRepository {
  public async registerToDB(email_address: string, verification_code: string, formatted_expiry_date: string) {
    const { data, error } = await supabase.rpc('set_verification_code_into_DB', {
      email_address,
      verification_code,
      formatted_expiry_date,
    });

    if (error) {
      if (error.code === '23505') {
        throw new UserAlreadyExistsError(ErrorMessages.ALREADY_EXISTING);
      }
    } else {
      console.log('user registration started');
    }
  }
}

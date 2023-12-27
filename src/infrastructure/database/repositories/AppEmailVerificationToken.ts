import { injectable } from "tsyringe";
import supabase from "../../../config/database/supabaseClient";

@injectable()
export class AppEmailVerificationTokenRepository {
  public async registerToDB(email_address: string, verification_code: number, formatted_expiry_date: string) {
    console.log("dans le AppEMailRepo1", email_address, verification_code, formatted_expiry_date);
    const { data, error } = await supabase.rpc("set_verification_code_into_DB", {
      email_address,
      verification_code,
      formatted_expiry_date,
    });
    console.log("dans le AppEMailRepo2", data, error);
    if (error) {
      throw new Error("Not being good");
    } else {
      console.log("user registration started");
    }
  }
}

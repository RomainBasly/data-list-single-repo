import { injectable } from "tsyringe";
import { IAppRefreshTokenRepository } from "../../../domain/authentication/types";
import supabase from "../../../config/database/supabaseClient";
import { User } from "../../../domain/user/types";

@injectable()
export class AppRefreshTokenRepository implements IAppRefreshTokenRepository {
  public async getUserByRefreshToken(refreshToken: string): Promise<User | null> {
    const { data, error } = await supabase.from("app-users").select().eq("refreshToken", refreshToken);
    if (error) {
      throw new Error(`something when wrong in the appRefreshTokenRepository: ${error.message}`);
    }
    return data ? data[0] : null;
  }
}

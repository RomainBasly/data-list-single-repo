import { injectable } from "tsyringe";
import supabase from "../../../config/database/supabaseClient";
import { User, IAppUserRepository } from "../../../domain/user/types";

@injectable()
export class AppUserRepository implements IAppUserRepository {
  public async create(userData: User) {
    const { error } = await supabase.from("app-users").insert([userData]).select();
    if (error) {
      throw new Error(`something when wrong in the appUserRepository: ${error.message}`);
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase.from("app-users").select().eq("email", email);
    if (error) {
      throw new Error(`something when wrong in the appUserRepository: ${error.message}`);
    }
    return data ? data[0] : null;
  }

  public async updateRefreshToken(refreshToken: string, email: string) {
    await supabase.from("app-users").update({ refreshToken: refreshToken }).eq("email", email);
  }

  public async findUserByRefreshToken(refreshToken: string) {
    return await supabase.from("app-users").select().eq("refreshToken", refreshToken);
  }

  public async clearUserRefreshToken(refreshToken: string) {
    return await supabase.from("app-users").update({ refreshToken: "" }).eq("refreshToken", refreshToken);
  }
}

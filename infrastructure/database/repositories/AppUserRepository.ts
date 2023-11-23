import { injectable } from "tsyringe";
import supabase from "../../../config/database/supabaseClient";
import { CreateUser, IAppUserRepository } from "../../../domain/user/types";

@injectable()
export class AppUserRepository implements IAppUserRepository {
  public async create(userData: CreateUser) {
    const { data, error } = await supabase.from("app-users").insert([userData]).select();
    if (error) {
      throw new Error(`something when wrong in the repo: ${error.message}`);
    }
  }

  public async userAlreadyExists(email: string) {
    const result = await supabase.from("app-users").select().eq("email", email);
    return result.data ? result.data.length > 0 : false;
  }
}

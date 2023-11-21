import supabase from "../../../config/database/supabaseClient";
import { CreateUser, IAppUserRepository } from "../../../domain/user/repository";

export class AppUserRepository implements IAppUserRepository {
  public async create(userData: CreateUser) {
    const { data, error } = await supabase.from("app-users").insert([{ userData }]).select();
  }
}

import { inject, injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';

@injectable()
export class AppCreateListRepository {
  public constructor() {}
}

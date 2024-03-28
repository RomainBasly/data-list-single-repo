import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { IInputAppList, ReturnedInvitedUsers, SupabaseReturnedList } from '../../../domain/ListManagement/types';
import { UUID } from 'crypto';

@injectable()
export class AppListManagementRepository {
  public constructor() {}

  public async createList(inputsAppList: IInputAppList): Promise<SupabaseReturnedList> {
    const { data, error } = await supabase.from('app-lists').insert(inputsAppList).select();

    if (error) {
      throw new Error('Problem creating the list');
    }
    return data && data.length > 0 ? data[0] : null;
  }
}

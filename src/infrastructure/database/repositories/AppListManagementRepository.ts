import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { IInputAppList, SupabaseReturnedList } from '../../../domain/ListManagement/types';

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

  public async getListsByUserId(userId: number) {
    const { data, error } = await supabase
      .from('app-list-beneficiaries')
      .select(
        'app-lists:app-list-id ( id, listName, description, thematic, beneficiaries:app-list-beneficiaries (app-users:user-id ( user_id, userName )))'
      )
      .eq('user-id', userId);

    if (error) {
      throw new Error('Problem getting the lists');
    }
    return data && data.length > 0 ? data : null;
  }
}

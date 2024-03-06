import { inject, injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { List, IInputAppList, SupabaseReturnedList } from '../../../domain/createList/types';
import { UUID } from 'crypto';

@injectable()
export class AppCreateListRepository {
  public constructor() {}

  public async createList(inputsAppList: IInputAppList): Promise<SupabaseReturnedList> {
    const { data, error } = await supabase.from('app-lists').insert(inputsAppList).select();

    if (error) {
      throw new Error('Problem creating the list');
    }
    return data && data.length > 0 ? data[0] : null;
  }

  public async createJoinedList() {}

  public async addListBeneficiary(listId: UUID, creatorId: number) {
    try {
      const { data, error } = await supabase
        .from('app-list-beneficiaries')
        .insert([{ 'user-id': creatorId, 'app-list-id': listId }])
        .select();
      return data;
    } catch (error) {
      throw new Error('error');
    }
  }
}

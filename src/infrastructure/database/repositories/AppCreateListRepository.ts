import { inject, injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { List, IInputAppList } from '../../../domain/createList/types';

@injectable()
export class AppCreateListRepository {
  public constructor() {}

  public async createList(inputsAppList: IInputAppList) {
    const { data, error } = await supabase.from('app-lists').insert(inputsAppList).select();
    return data;
  }

  public async createJoinedList() {}
}

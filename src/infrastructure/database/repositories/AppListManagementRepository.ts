import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { IInputAppList, SupabaseReturnedList } from '../../../domain/ListManagement/types';
import { UUID } from 'crypto';

interface User {
  user_id: number;
  userName: string;
}

interface Beneficiary {
  'app-users': User;
}

interface Item {
  id: number;
  updated_at: string;
  content: string;
  status: string;
}

interface List {
  id: string;
  listName: string;
  description: string;
  thematic: string;
  beneficiaries: Beneficiary[];
  items: Item[];
}

interface BeneficiaryData {
  'app-lists': List;
}

interface SupabaseResponse {
  data: BeneficiaryData[] | null;
  error: any;
}

interface SupabaseError {
  error: true;
  message: string;
}

function isSupabaseError(response: any): response is SupabaseError {
  return response && response.error === true;
}

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
        `
        app-lists:app-list-id (
          id,
          listName,
          description,
          thematic,
          beneficiaries:app-list-beneficiaries (
            app-users:user-id (
              user_id,
              userName
            )
          )
        )
      `
      )
      .eq('user-id', userId);

    if (error) {
      throw new Error('Problem getting the lists');
    }
    return data && data.length > 0 ? data : null;
  }

  public async getListById(listId: UUID, userId: number) {
    try {
      const { data } = await supabase
        .from('app-list-beneficiaries')
        .select(
          `
          app-lists:app-list-id (
            id,
            listName,
            description,
            thematic,
            beneficiaries:app-list-beneficiaries (
              app-users:user-id (
                user_id,
                userName
              )
            ),
            items:app-list-items (
              id,
              updated_at,
              content,
              statusOpen
            )
          )
        `
        )
        .eq('user-id', userId)
        .eq('app-list-id', listId);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async addItemToList(listId: UUID, content: string) {
    try {
      const { data } = await supabase
        .from('app-list-items')
        .insert([{ content, statusOpen: true, list_id: listId }])
        .select();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async isUserAllowedToChangeList(listId: UUID, userId: number): Promise<any> {
    try {
      const { data } = await supabase
        .from('app-list-beneficiaries')
        .select('*')
        .eq('user-id', userId)
        .eq('app-list-id', listId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async suppressItemById(listId: UUID, elementId: string) {
    try {
      await supabase.from('app-list-items').delete().eq('id', elementId).eq('list_id', listId);
    } catch (error) {
      throw error;
    }
  }
  public async changeItemStatus(listId: UUID, elementId: string, status: boolean) {
    try {
      const currentTimestamp = new Date().toISOString();
      const { data } = await supabase
        .from('app-list-items')
        .update({ statusOpen: status, updated_at: currentTimestamp })
        .eq('id', elementId)
        .eq('list_id', listId)
        .select();

      return data;
    } catch (error) {
      throw error;
    }
  }
  public async updateItemContent(listId: UUID, elementId: string, content: string) {
    try {
      const currentTimestamp = new Date().toISOString();
      const { data } = await supabase
        .from('app-list-items')
        .update({ content, updated_at: currentTimestamp, statusOpen: true })
        .eq('id', elementId)
        .eq('list_id', listId)
        .select('id, updated_at, content, statusOpen');
      return data;
    } catch (error) {
      throw error;
    }
  }
}

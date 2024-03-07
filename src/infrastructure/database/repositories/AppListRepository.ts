import { injectable } from 'tsyringe';
import supabase from '../../../config/database/supabaseClient';
import { IInputAppList, ReturnedInvitedUsers, SupabaseReturnedList } from '../../../domain/createList/types';
import { UUID } from 'crypto';

@injectable()
export class AppListRepository {
  public constructor() {}

  public async createList(inputsAppList: IInputAppList): Promise<SupabaseReturnedList> {
    const { data, error } = await supabase.from('app-lists').insert(inputsAppList).select();

    if (error) {
      throw new Error('Problem creating the list');
    }
    return data && data.length > 0 ? data[0] : null;
  }

  public async inviteUsersToList(invitedEmailAddresses: string[], listId: UUID) {
    const email_list = invitedEmailAddresses.join(',');
    try {
      const { data, error } = await supabase.rpc('add_people_to_list_invitations', {
        emails_text: email_list,
        list_id: listId,
      });
      if (error) {
        throw new Error('Problem adding elements inside the list invitation');
      }
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      throw new Error('Problem adding elements inside the list invitation, in the catch');
    }
  }

  public async addUserToListAsBeneficiary(listId: UUID, userId: number) {
    try {
      const { data, error } = await supabase
        .from('app-list-beneficiaries')
        .insert([{ 'user-id': userId, 'app-list-id': listId }])
        .select();
      return data;
    } catch (error) {
      throw new Error('error adding single list beneficiary');
    }
  }

  public async getPeopleToInviteByListId(listId: UUID): Promise<ReturnedInvitedUsers[]> {
    try {
      const { data, error } = await supabase
        .from('app-list-invitations')
        .select('email, list_id, is_already_active_user, is_already_invited')
        .eq('list_id', listId)
        .eq('is_already_invited', false);
      if (error) throw new Error('error getting people invited in the list');
      return data;
    } catch (error) {
      throw new Error('error getting people invited (catch)');
    }
  }
}

import { delay, inject, injectable } from 'tsyringe';
import { WebSocketClientService } from '../../webSockets/services';
import { ReturnedInvitedUsers } from '../../ListManagement/types';
import { UUID } from 'crypto';
import { AppUserInvitationsRepository } from '../../../infrastructure/database/repositories/AppUserInvitationsRepository';

@injectable()
export default class UserInvitationsService {
  public constructor(
    @inject(delay(() => WebSocketClientService)) private readonly webSocketService: WebSocketClientService,
    @inject(AppUserInvitationsRepository) private readonly appUserInvitationsRepository: AppUserInvitationsRepository
  ) {}

  public async addPeopleToListInvitations(
    invitedEmailAddresses: string[],
    listId: UUID,
    creatorId: number
  ): Promise<void> {
    await this.appUserInvitationsRepository.inviteUsersToList(invitedEmailAddresses, listId, creatorId);
    const getPeopleToInvite = await this.appUserInvitationsRepository.getPeopleToInviteByListId(listId);
    await this.invitePeople(getPeopleToInvite, listId);
  }

  public async fetchUserPendingInvitations(userId: string) {
    try {
      const data = await this.appUserInvitationsRepository.getListInvitationPerUser(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }
  private async invitePeople(invitedUsers: ReturnedInvitedUsers[], listId: UUID) {
    invitedUsers.map((user) => {
      if (user.is_already_active_user) {
        try {
          this.webSocketService.emit('list-invitation-backend', { userId: user.user_id, listId });
        } catch (error) {
          throw new Error(`message: ${error}`);
        }
      } else {
        // Todo : case 2 : send an email to those not registered in the app
      }
    });
  }
}

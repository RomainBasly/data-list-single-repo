import { injectable, inject } from 'tsyringe';
import { EmailValidationResult, List, ReturnedInvitedUsers } from './types';
import AppEmailValidation from '../emailVerification/validation';
import { AppListRepository } from '../../infrastructure/database/repositories/AppListRepository';
import { UUID } from 'crypto';
import { WebSocketClientService } from '../webSockets/services';

@injectable()
export class CreateListService {
  public constructor(
    private readonly appEmailValidation: AppEmailValidation,
    @inject(AppListRepository) private readonly appListRepository: AppListRepository,
    @inject(WebSocketClientService) private readonly webSocketService: WebSocketClientService
  ) {}

  public async createList(inputs: List) {
    try {
      // étape 1 : créer la liste
      /// tous les champs utiles sont là
      /// check if the emails are valid
      /// Vérifier que la personne est ou n'est pas dans la BDD
      // étape 2 : envoyer un email pour faire connaitre l'application
      const createListInput = {
        list_name: inputs.name,
        access_level: inputs.accessLevel,
        description: inputs.description,
        cyphered: false,
      };

      const { emails } = inputs;
      const dataListCreation = await this.appListRepository.createList(createListInput);
      if (dataListCreation && dataListCreation.id) {
        await this.appListRepository.addUserToListAsBeneficiary(dataListCreation.id, inputs.creatorId);
      }

      const validatedEmailAddresses = await this.validateEmails(emails);
      if (validatedEmailAddresses.length > 0) {
        await this.addPeopleToListInvitations(validatedEmailAddresses, dataListCreation.id);
      }
      // ajout des emails dans app-list-invitations
      // passage de l'envoi des emails + ajout dans la BDD
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  private async addPeopleToListInvitations(invitedEmailAddresses: string[], listId: UUID): Promise<void> {
    await this.appListRepository.inviteUsersToList(invitedEmailAddresses, listId);
    const getPeopleToInvite = await this.appListRepository.getPeopleToInviteByListId(listId);
    await this.invitePeople(getPeopleToInvite, listId);
  }

  private async invitePeople(invitedUsers: ReturnedInvitedUsers[], listId: UUID) {
    invitedUsers.map((user) => {
      if (user.is_already_active_user) {
        this.webSocketService.emit('list-invitation', { userId: user.user_id, listId });
      } else {
        // case 2 : send an email to those not registered in the app
      }
    });
  }

  private async validateEmails(emails: string[] | undefined) {
    let emailsAddress: string[] = [];
    if (emails) {
      await Promise.all(
        emails.map(async (email) => {
          const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
          emailsAddress.push(verifiedEmailObject.email);
        })
      );
    }
    return emailsAddress.length > 0 ? emailsAddress : [];
  }
}

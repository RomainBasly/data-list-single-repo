import { injectable, inject } from 'tsyringe';
import { List } from './types';
import AppEmailValidation from '../emailVerification/validation';
import { AppListManagementRepository } from '../../infrastructure/database/repositories/AppListManagementRepository';
import UserInvitationsService from '../user/Invitations/services';
import { AppUserInvitationsRepository } from '../../infrastructure/database/repositories/AppUserInvitationsRepository';

@injectable()
export class ListManagementService {
  public constructor(
    private readonly appEmailValidation: AppEmailValidation,
    @inject(AppListManagementRepository) private readonly appListRepository: AppListManagementRepository,
    @inject(UserInvitationsService) private readonly userInvitationsService: UserInvitationsService,
    @inject(AppUserInvitationsRepository) private readonly appUserInvitationsRepository: AppUserInvitationsRepository
  ) {}

  public async createList(inputs: List, creatorUserName: string, creatorEmail: string) {
    try {
      // étape 1 : créer la liste
      /// tous les champs utiles sont là
      /// check if the emails are valid
      /// Vérifier que la personne est ou n'est pas dans la BDD
      // étape 2 : envoyer un email pour faire connaitre l'application
      const { emails, description, name } = inputs;
      const createListInputForListCreation = {
        listName: inputs.name,
        access_level: inputs.accessLevel,
        description: inputs.description,
        cyphered: false,
      };

      const dataListCreation = await this.appListRepository.createList(createListInputForListCreation);
      if (dataListCreation && dataListCreation.id) {
        await this.appUserInvitationsRepository.addUserToListAsBeneficiary(dataListCreation.id, inputs.creatorId);
      }

      const validatedEmailAddresses = await this.validateEmails(emails);
      if (validatedEmailAddresses.length > 0) {
        await this.userInvitationsService.addPeopleToListInvitations(
          validatedEmailAddresses,
          dataListCreation.id,
          inputs.creatorId,
          creatorEmail,
          creatorUserName,
          name,
          description
        );
      }
      // ajout des emails dans app-list-invitations
      // passage de l'envoi des emails + ajout dans la BDD
      // envoyer une information à la BDD
      // envoyer l'information aux personnes concernées
    } catch (error) {
      console.log('error', error);
      throw error;
    }
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

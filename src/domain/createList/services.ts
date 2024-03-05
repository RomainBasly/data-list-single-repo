import { injectable, inject } from 'tsyringe';
import { EmailValidationResult, List } from './types';
import AppEmailValidation from '../emailVerification/validation';
import { AppCreateListRepository } from '../../infrastructure/database/repositories/AppCreateListRepository';

@injectable()
export class CreateListService {
  public constructor(
    private readonly appEmailValidation: AppEmailValidation,
    @inject(AppCreateListRepository) private readonly appCreateListRepository: AppCreateListRepository
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
      //const dataListCreation = await this.appCreateListRepository.createList(createListInput);
      const verifiedCreatorEmailObject = await this.appEmailValidation.validateEmail(inputs.creatorEmail);
      const verifiedCreatorEmail = verifiedCreatorEmailObject.email;

      if (inputs.emails) {
        let emailsAddress: string[] = [verifiedCreatorEmailObject.email];
        await Promise.all(
          inputs.emails.map(async (email) => {
            const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
            emailsAddress.push(verifiedEmailObject.email);
          })
          // passage de l'envoi des emails + ajout dans la BDD
        );
        console.log(emailsAddress);
      } else {
        const emails = { ...verifiedCreatorEmailObject };
        console.log('emails out of map', emails);
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}

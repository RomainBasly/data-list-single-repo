import { injectable, inject, delay } from 'tsyringe';
import { IBeneficiary, List } from './types';
import { AppListManagementRepository } from '../../infrastructure/database/repositories/AppListManagementRepository';
import UserInvitationsService from '../user/Invitations/services';
import { AppUserInvitationsRepository } from '../../infrastructure/database/repositories/AppUserInvitationsRepository';
import { ListValidatorService } from './validation';
import { UUID } from 'crypto';
import { WebSocketClientService } from '../webSockets/services';

type User = {
  user_id: number;
  userName: string;
};

type Beneficiary = {
  'app-users': User;
};

type ListType = {
  id: string;
  listName: string;
  thematic: string;
  description: string;
  beneficiaries: Beneficiary[];
};

type IElementType = {
  'app-lists': ListType;
};

@injectable()
export class ListManagementService {
  public constructor(
    @inject(delay(() => WebSocketClientService)) private readonly webSocketService: WebSocketClientService,
    @inject(AppListManagementRepository) private readonly appListManagementRepository: AppListManagementRepository,
    @inject(UserInvitationsService) private readonly userInvitationsService: UserInvitationsService,
    @inject(AppUserInvitationsRepository) private readonly appUserInvitationsRepository: AppUserInvitationsRepository,
    @inject(ListValidatorService) private readonly listValidatorService: ListValidatorService
  ) {}

  public async createList(inputs: List, creatorUserName: string, creatorEmail: string) {
    try {
      const { emails, description, name, thematic } = inputs;
      const createListInputForListCreation = {
        listName: inputs.name,
        access_level: inputs.accessLevel,
        description: inputs.description,
        cyphered: false,
        thematic: inputs.thematic,
      };

      const dataListCreation = await this.appListManagementRepository.createList(createListInputForListCreation);
      if (dataListCreation && dataListCreation.id) {
        await this.appUserInvitationsRepository.addUserToListAsBeneficiary(dataListCreation.id, inputs.creatorId);
      }

      const validatedEmailAddresses = await this.listValidatorService.validateEmails(emails);
      if (validatedEmailAddresses.length > 0) {
        await this.userInvitationsService.addPeopleToListInvitations(
          validatedEmailAddresses,
          dataListCreation.id,
          inputs.creatorId,
          creatorEmail,
          creatorUserName,
          name,
          thematic,
          description
        );
      }
    } catch (error) {
      throw error;
    }
  }

  public async getListBeneficiariesById(userId: number): Promise<IElementType[]> {
    try {
      const beneficiaries = await this.appListManagementRepository.getListsByUserId(userId);

      if (!beneficiaries) {
        console.error('No beneficiaries or no list', beneficiaries);
        return [];
      }

      const filteredBeneficiaries = beneficiaries.map((element: any) => {
        if (element && element['app-lists'] && Array.isArray(element['app-lists'].beneficiaries)) {
          return {
            ...element,
            'app-lists': {
              ...element['app-lists'],
              beneficiaries: element['app-lists'].beneficiaries.filter(
                (beneficiary: { [x: string]: { user_id: number } }) => beneficiary['app-users'].user_id !== userId
              ),
            },
          };
        } else {
          console.error('Unexpected element structure', element);
          return element; // or handle accordingly
        }
      });

      return filteredBeneficiaries;
    } catch (error) {
      console.error('Error fetching list beneficiaries', error);
      throw error;
    }
  }

  public async getListByListId(listId: UUID, userId: number) {
    try {
      const list = await this.appListManagementRepository.getListById(listId, userId);

      if (!list) {
        console.error('Unexpected list structure', list);
        return [];
      }

      const filteredBeneficiariesList = list.map((element: any) => {
        if (element && element['app-lists'] && Array.isArray(element['app-lists'].beneficiaries)) {
          return {
            ...element,
            'app-lists': {
              ...element['app-lists'],
              beneficiaries: element['app-lists'].beneficiaries.filter(
                (beneficiary: { [x: string]: { user_id: number } }) => beneficiary['app-users'].user_id !== userId
              ),
            },
          };
        } else {
          console.error('Unexpected element structure', element);
          return element; // or handle accordingly
        }
      });
      return filteredBeneficiariesList;
    } catch (error) {
      throw error;
    }
  }

  public async addItemToList(listId: UUID, userId: number, content: string, beneficiaries: IBeneficiary[]) {
    try {
      const inputs = { listId, userId, content };
      await this.listValidatorService.verifyInputAddOrUpdateItem(inputs);
      const isAllowed = await this.appListManagementRepository.isUserAllowedToChangeList(listId, userId);
      if (isAllowed.length > 0) {
        const addedItem = await this.appListManagementRepository.addItemToList(listId, content);
        this.webSocketService.emit('adding-item-to-list-backend', {
          addedItem,
          beneficiaries,
        });
        return addedItem;
      }
    } catch (error) {
      throw error;
    }
  }

  public async suppressElementById(listId: UUID, userId: number, elementId: string, beneficiaries: IBeneficiary[]) {
    try {
      const isAllowed = await this.appListManagementRepository.isUserAllowedToChangeList(listId, userId);
      if (isAllowed.length > 0) {
        const response = await this.appListManagementRepository.suppressItemById(listId, elementId);
        this.webSocketService.emit('suppress-item-from-list-backend', {
          elementId,
          beneficiaries,
        });
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  public async changeItemStatus(
    listId: UUID,
    userId: number,
    elementId: string,
    status: boolean,
    beneficiaries: IBeneficiary[]
  ) {
    try {
      const updatedItem = await this.appListManagementRepository.changeItemStatus(listId, elementId, status);
      this.webSocketService.emit('change-item-status-backend', {
        updatedItem,
        beneficiaries,
      });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  public async updateItemContent(
    listId: UUID,
    userId: number,
    elementId: string,
    content: string,
    beneficiaries: IBeneficiary[]
  ) {
    try {
      const inputs = { listId, userId, content };
      await this.listValidatorService.verifyInputAddOrUpdateItem(inputs);
      const updatedItem = await this.appListManagementRepository.updateItemContent(listId, elementId, content);
      this.webSocketService.emit('update-item-content-backend', {
        updatedItem,
        beneficiaries,
      });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }
}

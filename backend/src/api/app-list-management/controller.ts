import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ListManagementService } from '../../domain/ListManagement/services';
import { ListValidatorService } from '../../domain/ListManagement/validation';
import { getFromJWTToken } from '../../common/helpers';
import { UserInfo } from '../../common/types/api';
import assert from 'assert';
import { UUID } from 'crypto';

@injectable()
export class ListManagementController {
  constructor(
    @inject(ListManagementService) private readonly listManagementService: ListManagementService,
    @inject(ListValidatorService) private readonly listValidatorService: ListValidatorService
  ) {}

  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const { listName, accessLevel, description, emails, cyphered, thematic } = req.body;
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const creatorUserName = userInfo.userName;
      const creatorEmail = userInfo.email;
      const creatorId = userInfo.id;
      const validatedInputs = await this.listValidatorService.preCheckListCreation({
        name: listName,
        accessLevel,
        description,
        creatorId,
        creatorEmail,
        creatorUserName,
        emails,
        cyphered,
        thematic,
      });
      await this.listManagementService.createList(validatedInputs, creatorUserName, creatorEmail);
      res.status(201).json({ message: 'new list created' });
    } catch (error) {
      next(error);
    }
  }

  public async getListForUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const userId = userInfo.id;
      const data = await this.listManagementService.getListBeneficiariesById(userId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  public async getListById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const listId = req.params.listId as UUID;

      const userId = userInfo.id;
      const data = await this.listManagementService.getListByListId(listId, userId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  public async addItemToList(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const listId = req.body.listId as UUID;
      const userId = userInfo.id;
      const content = req.body.content;
      const beneficiaries = req.body.beneficiaries;
      const addedElement = await this.listManagementService.addItemToList(listId, userId, content, beneficiaries);
      res.status(200).json({ message: 'item added', addedElement });
    } catch (error) {
      next(error);
    }
  }

  public async suppressItemByListId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const elementId = req.body.elementId;
      const listId = req.body.listId as UUID;
      const beneficiaries = req.body.beneficiaries;
      const userId = userInfo.id;
      await this.listManagementService.suppressElementById(listId, userId, elementId, beneficiaries);
      res.status(200).json({ success: true, message: 'item suppressed' });
    } catch (error) {
      next(error);
    }
  }

  public async changeItemStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const elementId = req.body.elementId;
      const status = req.body.status;
      const listId = req.body.listId as UUID;
      const beneficiaries = req.body.beneficiaries;
      const userId = userInfo.id;
      const response = await this.listManagementService.changeItemStatus(
        listId,
        userId,
        elementId,
        status,
        beneficiaries
      );
      res.status(200).json({ success: true, message: 'status changed', itemStatusChanged: response });
    } catch (error) {
      next(error);
    }
  }

  public async updateItemContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const elementId = req.body.elementId;
      const content = req.body.content;
      const listId = req.body.listId;
      const beneficiaries = req.body.beneficiaries;
      const userId = userInfo.id;
      const response = await this.listManagementService.updateItemContent(
        listId,
        userId,
        elementId,
        content,
        beneficiaries
      );
      res.status(200).json({ success: true, message: 'content of the item updated', itemContentChanged: response });
    } catch (error) {
      next(error);
    }
  }
}

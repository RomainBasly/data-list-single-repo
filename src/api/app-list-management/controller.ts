import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ListManagementService } from '../../domain/ListManagement/services';
import { ListValidatorService } from '../../domain/ListManagement/validation';
import { getFromJWTToken } from '../../common/helpers';
import { UserInfo } from '../../common/types/api';
import assert from 'assert';

@injectable()
export class ListManagementController {
  constructor(
    @inject(ListManagementService) private readonly listManagementService: ListManagementService,
    @inject(ListValidatorService) private readonly listValidatorService: ListValidatorService
  ) {}

  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const { name: listName, accessLevel, description, emails, cyphered, thematic } = req.body;
      const { userInfo } = getFromJWTToken(req, 'accessToken') as UserInfo;
      const creatorUserName = userInfo.userName;
      const creatorEmail = userInfo.email;
      const creatorId = userInfo.id;
      const validatedInputs = await this.listValidatorService.preCheck({
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
      console.log('data', data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

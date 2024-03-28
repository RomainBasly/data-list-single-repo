import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ListManagementService } from '../../domain/ListManagement/services';
import { CreateListValidatorService } from '../../domain/ListManagement/validation';

@injectable()
export class ListManagementController {
  constructor(
    @inject(ListManagementService) private readonly listManagementService: ListManagementService,
    @inject(CreateListValidatorService) private readonly createListValidatorService: CreateListValidatorService
  ) {}

  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, accessLevel, creatorId, description, emails, cyphered } = req.body;
      const validatedInputs = await this.createListValidatorService.preCheck({
        name,
        accessLevel,
        description,
        creatorId,
        emails,
        cyphered,
      });
      await this.listManagementService.createList(validatedInputs);
      res.status(201).json({ message: 'new list created' });
    } catch (error) {
      next(error);
    }
  }
}

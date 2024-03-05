import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { CreateListService } from '../../domain/createList/services';
import { CreateListValidatorService } from '../../domain/createList/validation';

@injectable()
export class AppCreateListController {
  constructor(
    @inject(CreateListService) private readonly createListService: CreateListService,
    @inject(CreateListValidatorService) private readonly createListValidatorService: CreateListValidatorService
  ) {}

  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      console.log('authHeader', authHeader);
      const { name, accessLevel, creatorEmail, description, emails, cyphered } = req.body;
      const validatedInputs = await this.createListValidatorService.preCheck({
        name,
        accessLevel,
        description,
        creatorEmail,
        emails,
        cyphered,
      });
      console.log('validatedInputs', validatedInputs);
      await this.createListService.createList(validatedInputs);
      res.status(201).json({ message: 'new list created' });
    } catch (error) {
      next(error);
    }
  }
}

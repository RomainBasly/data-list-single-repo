import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import UserInvitationsService from '../../domain/user/Invitations/services';

@injectable()
export class AppUserInvitationsController {
  constructor(@inject(UserInvitationsService) private readonly userInvitationsService: UserInvitationsService) {}

  public async getUserInvitations(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(403).json({ message: 'wooooops forbidden' });
      }
      await this.userInvitationsService.fetchUserInvitations(userId);
    } catch (error) {
      next(error);
    }
  }
}

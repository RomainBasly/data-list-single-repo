import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import UserInvitationsService from '../../domain/user/Invitations/services';
import { ErrorMessages, ForbiddenError } from '../../domain/common/errors';

interface GetUserInviteRequest extends Request {
  id?: string;
  roles?: string[];
}

@injectable()
export class AppUserInvitationsController {
  constructor(@inject(UserInvitationsService) private readonly userInvitationsService: UserInvitationsService) {}

  public async getUserInvitations(req: GetUserInviteRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const id = String(req.id);

      if (!userId || userId !== id) {
        throw new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR);
      }
      const data = await this.userInvitationsService.fetchUserPendingInvitations(userId);
      console.log('data controller', data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

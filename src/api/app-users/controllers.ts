import { inject, injectable } from 'tsyringe';
import { Response, Request } from 'express';
import { UserService } from '../../domain/user/services';
import { UserAlreadyExistsError } from '../../domain/common/errors';

@injectable()
export class AppUserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async registerNewUser(req: Request, res: Response): Promise<void> {}

  getAllUsers(req: Request, res: Response) {
    try {
      // to implement
    } catch (error) {
      console.log(error);
      res.status(400).send('error getting the users');
    }
  }

  getUserById(req: Request, res: Response) {
    const { id } = req.params;

    // to implement
  }

  postUsers(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      res.json({
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send('error posting the users');
    }
  }

  putUsers(req: Request, res: Response) {
    const { id, email, password } = req.body;

    try {
      res.json({ id, email, password });
    } catch (error) {}
  }

  deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    try {
      res.json({ id });
    } catch (error) {}
  }
}

import { inject, injectable } from "tsyringe";
import * as Data from "../../../infrastructure/fakeData/users.json";
import { Response, Request } from "express";
import { UserService } from "../../../domain/user/services";
import { UserAlreadyExistsError } from "../../../domain/common/errors";

@injectable()
export class AppUserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async registerNewUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("userName and password are required");
      return;
    }
    try {
      await this.userService.registerUser(email, password);
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        res.status(409).json({ message: error.message });
      } else {
        console.error("Error in AppUserController", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  getAllUsers(req: Request, res: Response) {
    try {
      res.json(Data.users);
    } catch (error) {
      console.log(error);
      res.status(400).send("error getting the users");
    }
  }

  getUserById(req: Request, res: Response) {
    const { id } = req.params;
    res.json(Data.users.find((user) => user.id === Number(id)));
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
      res.status(400).send("error posting the users");
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

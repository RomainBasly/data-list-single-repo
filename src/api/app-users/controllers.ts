import * as Data from "../../../infrastructure/fakeData/users.json";
import { Response, Request } from "express";

export class AppUserController {
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

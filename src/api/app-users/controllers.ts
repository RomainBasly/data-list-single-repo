import * as Data from "../../../infrastructure/fakeData/users.json";
import { Response, Request } from "express";
import { get, controller, bodyValidator, post, use } from "../../common/decorators";
import { requireAuth } from "../app-auth/controllers";

@controller("/api/user")
export class AppUserController {
  @get("/:id")
  @use(requireAuth)
  getUserById(req: Request, res: Response) {
    const { id } = req.params;
    res.json(Data.users.find(user => user.id === Number(id)))
  }

  @get("/")
  getUsers(req: Request, res: Response) {
    try {
      res.json(Data.users);
    } catch (error) {
      console.log(error);
      res.status(400).send("error getting the users");
    }
  }
}

export const postUsers = (req: Request, res: Response) => {
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
};

export const putUsers = (req: Request, res: Response) => {
  const { id, email, password } = req.body;

  try {
    res.json({ id, email, password });
  } catch (error) {}
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    res.json({ id });
  } catch (error) {}
};

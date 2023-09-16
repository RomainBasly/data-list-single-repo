import * as Data from "../../../infrastructure/fakeData/users.json";
import { RequestWithBody } from "../../common/types/api";
import { Response } from "express";

export const getUsers = (req: RequestWithBody, res: Response) => {
  try {
    res.json(Data.users);
  } catch (error) {
    console.log(error);
    res.status(400).send("error getting the users");
  }
};

export const postUsers = (req: RequestWithBody, res: Response) => {
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

export const putUsers = (req: RequestWithBody, res: Response) => {
  const { id, email, password } = req.body;

  try {
    res.json({ id, email, password });
  } catch (error) {}
};

export const deleteUser = (req: RequestWithBody, res: Response) => {
  const { id } = req.body;
  try {
    res.json({ id });
  } catch (error) {}
};

export const getUserById = (req: RequestWithBody, res: Response) => {
  const { id } = req.params;
  res.json({ id });
};

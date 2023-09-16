import supabase from "../../../config/database/supabaseClient";
import { RequestWithBody } from "../../common/types/api";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not permitted")
}

export const checkSessionUser = (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send("you are loggedIn Baby")
  } else {
    res.send("you are not loggedIn Copeng")
  }
}

export const logoutUser = (req: RequestWithBody, res:Response) => {
  req.session = undefined;
  res.send("you are now loggedOut, copeng")
}

export const signup_get = (req: RequestWithBody, res: Response) => {
  res.send("signup get");
};
export const login_get = (req: RequestWithBody, res: Response) => {
  res.send("login get");
};
export const signup_post = async (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data, error);
    }
    res.status(201).send("user created");
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
};

export const login_post = (req: RequestWithBody, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password === "Tatayoyo") {
      req.session = { loggedIn: true };
      res.send("you are now loggedIn")
    }
    console.log({ email, password });
  } catch (error) {
    console.log(error);
    res.status(400).send("error in login_post");
  }
};

import supabase from "../../../config/database/supabaseClient";
import { Request, Response, NextFunction } from "express";
import { get, controller, bodyValidator, post, use } from "../../common/decorators";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not permitted");
}

@controller("/api/auth")
export class AppAuthController {
  @get("/")
  checkSessionUser(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send("you are loggedIn Baby");
    } else {
      res.send("you are not loggedIn Copeng");
    }
  }

  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send("it works baby congratulations");
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response): void {
    try {
      const { email, password } = req.body;
      if (email === "hi@hi.com" && password === "Tatayoyo") {
        req.session = { loggedIn: true };
        res.send("you are now loggedIn babababab");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("error in login_post");
    }
  }

  @get("/logout")
  logoutUser(req: Request, res: Response) {
    req.session = undefined;
    res.send("you are now loggedOut, copeng");
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("welcome to the website, copeng");
  }
}

export const signup_post = async (req: Request, res: Response) => {
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

export const signup_get = (req: Request, res: Response) => {
  res.send("signup get");
};
export const login_get = (req: Request, res: Response) => {
  res.send("login get");
};

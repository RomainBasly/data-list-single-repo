import supabase from "../../../config/database/supabaseClient";
import { Request, Response, NextFunction } from "express";
import { get, controller, bodyValidator, post, use, bind } from "../../common/decorators";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import * as employeesModule from "../../../infrastructure/fakeData/employees.json";
import { AuthService } from "./services";
import jwt from "jsonwebtoken";

interface Employee {
  email: string;
  password: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req?.session?.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not permitted");
}

const employees = (employeesModule as any).default as any[];
const employeesDB = {
  employees: employees || [],
  setUsers: function (data: any) {
    this.employees = data;
  },
};

@controller("/api/auth")
export class AppAuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET);
    this.authService = authService;
  }

  @get("/")
  checkSessionUser(req: Request, res: Response) {
    if (req?.session?.loggedIn) {
      res.send("you are loggedIn Baby");
    } else {
      res.send("you are not loggedIn Copeng");
    }
  }

  @post("/login")
  @bodyValidator("email", "password")
  @bind
  async postLogin(req: Request<{}, {}, Employee>, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userMatchingDB: Employee = employeesDB.employees.find((person) => person.email === email);
      if (!userMatchingDB) {
        res.sendStatus(401);
        return;
      }
      const matchingPassword = await bcrypt.compare(password, userMatchingDB.password);
      if (matchingPassword) {
        console.log(this.authService)
        const accessToken = this.authService.generateAccessToken({ email: userMatchingDB.email });
        const refreshToken = this.authService.generateRefreshToken({ email });
        const otherUsers = employeesDB.employees.filter((employee) => employee.email !== userMatchingDB.email);
        const currentUser = { ...userMatchingDB, refreshToken };
        employeesDB.setUsers([...otherUsers, currentUser]);
        await fs.promises.writeFile(
          path.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"),
          JSON.stringify(employeesDB.employees)
        );
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("error in login_post");
    }
  }

  @get("/logout")
  @use(requireAuth)
  logoutUser(req: Request, res: Response) {
    req.session = undefined;
    res.send("you are now loggedOut, copeng");
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("welcome to the website, copeng");
  }

  @post("/register")
  async handleNewUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("userName and password are required");
      return;
    }

    const duplicate = employeesDB.employees.find((person: { email: string }) => person.email === email);
    if (duplicate) {
      res.sendStatus(409).json("You are already in the database, try to login instead");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { email: email, password: hashedPassword };
      employeesDB.setUsers([...employeesDB.employees, newUser]);
      await fs.promises.writeFile(
        path.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"),
        JSON.stringify(employeesDB.employees)
      );
      console.log(employeesDB.employees);
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      res.status(500).json({ "message error 500": error });
    }
  }
}

export const signup_post_with_supabase = async (req: Request, res: Response) => {
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

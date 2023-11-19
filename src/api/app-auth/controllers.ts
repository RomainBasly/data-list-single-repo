import supabase from "../../../config/database/supabaseClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import * as fakeDataModule from "../../../infrastructure/fakeData/employees.json";
import { AuthService } from "./services";
import { inject, injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../common/types/api";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

interface Employee {
  email: string;
  roles: {};
  password: string;
}

const fakeUsers = (fakeDataModule as any).default as any[];
const fakeUsersDB = {
  users: fakeUsers || [],
  setUsers: function (data: any) {
    this.users = data;
  },
};

// Here is injection dependencies used in this architecture
// If you do not get it please check tsyringe
@injectable()
export class AppAuthController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  async registerNewUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("userName and password are required");
      return;
    }

    const duplicate = fakeUsersDB.users.find((person: { email: string }) => person.email === email);
    if (duplicate) {
      res.sendStatus(409).json("You are already in the database, try to login instead");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { email: email, roles: { [Roles.USER]: true }, password: hashedPassword };
      fakeUsersDB.setUsers([...fakeUsersDB.users, newUser]);
      await fs.promises.writeFile(
        path.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"),
        JSON.stringify(fakeUsersDB.users)
      );
      console.log(fakeUsersDB.users);
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      res.status(500).json({ "message error 500": error });
    }
  }

  async login(req: Request<{}, {}, Employee>, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userMatchingDB: Employee = fakeUsersDB.users.find((person) => person.email === email);
      if (!userMatchingDB) {
        res.sendStatus(401);
        return;
      }
      const matchingPassword = await bcrypt.compare(password, userMatchingDB.password);
      if (matchingPassword) {
        const defaultRole: RoleAssignments = { [Roles.USER]: true };

        const userRolesFromDB = userMatchingDB.roles as RoleAssignments;
        const roles = { ...defaultRole, ...userRolesFromDB };
        const accessToken = this.authService.generateAccessToken({
          userInfo: { email: userMatchingDB.email, roles },
        });
        const refreshToken = this.authService.generateRefreshToken({ email });
        const otherUsers = fakeUsersDB.users.filter((employee) => employee.email !== userMatchingDB.email);
        const currentUser = { ...userMatchingDB, refreshToken };
        fakeUsersDB.setUsers([...otherUsers, currentUser]);
        await fs.promises.writeFile(
          path.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"),
          JSON.stringify(fakeUsersDB.users)
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("error in login_post");
    }
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = fakeUsersDB.users.find((person) => person.refreshToken === refreshToken);

    if (!refreshTokenSecret) throw new Error("no refreshToken in the controler");
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.send(204);
    }

    const otherUsers = fakeUsersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: "" };
    fakeUsersDB.setUsers([...otherUsers, currentUser]);
    await fs.promises.writeFile(
      path.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"),
      JSON.stringify(fakeUsersDB.users)
    );
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  }
}

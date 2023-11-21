import supabase from "../../../config/database/supabaseClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { AuthService } from "./services";
import { inject, injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../common/types/api";

interface Employee {
  email: string;
  roles: {};
  password: string;
}

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

    const alreadyUser = await supabase.from("app-users").select().eq("email", email);
    if (alreadyUser) {
      res.sendStatus(409).json("You are already in the database, try to login instead");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { email: email, roles: { [Roles.USER]: true }, password: hashedPassword };
      await supabase.from("app-users").insert([newUser]).select();
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      res.status(500).json({ "message error 500": error });
    }
  }

  async login(req: Request<{}, {}, Employee>, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userMatchingDB = await supabase.from("app-users").select().eq("email", email);
      if (!userMatchingDB || !userMatchingDB.data || userMatchingDB.data.length === 0) {
        res.sendStatus(401);
        return;
      }
      const dataFromDB = userMatchingDB.data[0];
      const passwordFromDB = dataFromDB.password;
      const matchingPassword = await bcrypt.compare(password, passwordFromDB);
      if (matchingPassword) {
        const defaultRole: RoleAssignments = { [Roles.USER]: true };

        const userRolesFromDB = dataFromDB.roles as RoleAssignments;
        const roles = { ...defaultRole, ...userRolesFromDB };
        const accessToken = this.authService.generateAccessToken({
          userInfo: { email, roles },
        });
        const refreshToken = this.authService.generateRefreshToken({ email });
        await supabase.from("app-users").update({ refreshToken: refreshToken }).eq("email", email);
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

    const foundUserRefreshToken = await supabase.from("app-users").select().eq("refreshToken", refreshToken);

    if (!foundUserRefreshToken) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.send(204);
    }

    await supabase.from("app-users").update({ refreshToken: "" }).eq("refreshToken", refreshToken);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  }
}

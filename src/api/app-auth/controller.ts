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

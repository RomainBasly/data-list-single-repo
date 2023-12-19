import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserService } from "../../domain/user/services";
import assert from "assert";

interface UserInfo {
  email: string;
  roles: {};
  password: string;
}

// Here is injection dependencies used in this architecture
// If you do not get it please check tsyringe
@injectable()
export class AppAuthController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async login(req: Request<{}, {}, UserInfo>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const { accessToken, refreshToken } = await this.userService.login(email, password);

      assert(refreshToken, "problem with refreshToken inside user login service");
      assert(accessToken, "problem with refreshToken inside user login service");
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true, // in dev mode use false
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const isLoggedOut = await this.userService.logoutUser(refreshToken);

    if (!isLoggedOut) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.send(204);
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  }
}

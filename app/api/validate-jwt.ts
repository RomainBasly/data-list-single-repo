import AuthService from "@/Services/authService";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const validatedToken = AuthService.getInstance().validateJWT(token);
    if (!validatedToken) {
      throw new Error("Invalid token");
    }
    res.status(200).json({ valid: true, decoded: validatedToken });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
}

import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieHeader = req.headers.cookie;

  try {
    const refreshTokenApi = AuthorizationApi.getInstance();

    if (cookieHeader) {
      const data = await refreshTokenApi.getNewAccessToken(cookieHeader);
      return res.status(200).json(data);
    } else {
      throw new Error("error getting the cookieHeader from the request");
    }
  } catch (error) {
    // Handle errors (e.g., from your backend call)
    console.log("error is", error);
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
}

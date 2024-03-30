// File: /pages/api/invitations.js

import ListInvitationsApi from "@/api/Back/ListsApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract accessToken as you did in your action function
  const cookieHeader = req.headers.cookie;
  const accessTokenCookie = cookieHeader
    ?.split(";")
    .find((row) => row.trim().startsWith("accessToken="));
  if (!accessTokenCookie) {
    return res.status(401).json({ error: "Access token not found" });
  }
  const accessToken = accessTokenCookie.split("=")[1];

  // Assuming you've obtained userId in some manner, e.g., from the session or decoded token
  const userId = "111";

  try {
    const invitations = await ListInvitationsApi.getInstance().getInvitations(
      userId,
      accessToken
    );
    res.status(200).json(invitations);
  } catch (error) {
    // Handle errors (e.g., from your backend call)
    console.log("error is", error);
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
}

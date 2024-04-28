import ListInvitationsApi from "@/api/Back/ListsApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieHeader = req.headers.cookie;
  const status = req.query.status;
  try {
    const invitationsApi = ListInvitationsApi.getInstance();
    const invitations = await invitationsApi.getInvitations(status, {
      Cookie: cookieHeader || "",
    });
    res.status(200).json(invitations);
  } catch (error) {
    // Handle errors (e.g., from your backend call)
    console.log("error is", error);
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
}

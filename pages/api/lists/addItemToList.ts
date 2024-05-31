import ListInvitationsApi from "@/api/Back/ListInvitationsApi";
import ListsApi from "@/api/Back/UserListsApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieHeader = req.headers.cookie;
  const listId = req.body.listId;
  const content = req.body.content;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const listsApi = ListsApi.getInstance();

    await listsApi.addItemToList(listId, content, {
      Cookie: cookieHeader || "",
    });

    return res.status(200).json({ message: "Item added to list" });
  } catch (error) {
    // Handle errors (e.g., from your backend call)
    console.log("error is", error);
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
}

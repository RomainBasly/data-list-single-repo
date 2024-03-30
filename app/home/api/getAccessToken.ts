import { NextApiRequest, NextApiResponse } from "next";

export async function action(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (typeof request.headers.get !== "function") {
    response.status(500).json({ error: "Headers get method not supported" });
    return;
  }

  const cookieHeader = request.headers["cookie"];

  if (!cookieHeader) {
    response.status(400).json({ error: "No cookies found" });
    return;
  }
  const accessTokenCookie = cookieHeader
    .split(";")
    .find((row) => row.startsWith("accessToken="));

  // Check if the accessTokenCookie is undefined
  if (!accessTokenCookie) {
    response.status(401).json({ error: "Access token not found" });
    return;
  }

  const accessToken = accessTokenCookie.split("=")[1];
}

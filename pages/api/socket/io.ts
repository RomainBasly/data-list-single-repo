import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "../../../types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  console.log("I passed in the ioHandler");
  //   console.log("2", res.socket.server.io);
  if (!res.socket.server.io) {
    const path = "/";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(
      httpServer,
      {
        cors: {
          origin: "http://localhost:3000", // Adjust this to match your Next.js app's origin
          methods: ["GET", "POST"],
        },
      }
      //     , {
      //   path,
      //   // @ts-ignore
      //   addTailingSlash: false,
      // }
    );
    console.log(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;

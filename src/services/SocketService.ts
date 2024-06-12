import express from "express";
import http from "http";
import { Server as IOServer, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import { randomBytes } from "node:crypto";

export class SocketService {
  private expressApp: express.Application;
  private httpServer: http.Server;
  private io: IOServer;
  private readonly port: string | number;
  private static instance: SocketService;
  private userSocketMap: Map<string, { socketId: string; userId?: string }>;

  constructor() {
    this.expressApp = express();
    this.httpServer = http.createServer();
    this.io = new IOServer(this.httpServer, {
      cors: {
        origin: [
          "https://data-list-collaborative-r54h7zfc9-romainbaslys-projects.vercel.app/",
          "https://stingray-app-69yxe.ondigitalocean.app/api",
        ], // Allowed origins
        methods: ["GET", "POST"], // Allowed HTTP request methods
        allowedHeaders: ["my-custom-header"], // Custom headers that can be sent
        credentials: true, // Allow sending of cookies and credentials
      },
    });
    this.port = process.env.PORT || 3001;

    this.userSocketMap = new Map();

    this.initializeSocket();
    this.listen();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketService();
    }
    return this.instance;
  }

  private initializeSocket(): void {
    this.io.on("connection", (socket: Socket) => {
      const socketId = randomBytes(16).toString("hex");
      socket.emit("assign-socket-id", {
        socketId,
      });
      this.userSocketMap.set(socketId, {
        socketId,
      });
      console.log("this.userSocketMap", this.userSocketMap);
      socket.on("ping", () => {
        socket.emit("pong");
      });
      socket.on("disconnect", () => {
        this.userSocketMap.delete(socketId);
        this.userSocketMap.delete(socket.id);
        // const userId = [...this.userSocketMap.entries()].find(
        //   ([_, value]) => value.socketId === socket.id
        // )?.[0];
        // if (userId) {
        //   this.userSocketMap.delete(userId);
        //   console.log(`User ${userId} disconnected, removing entry from map.`);
        // }
        console.log("disconnect", this.userSocketMap, socket.id);
      });

      socket.on("list-invitation-backend", (data: any) => {
        const { userId } = data;

        let targetSocketId: string | undefined;

        // Iterate over the map to find the matching userId
        for (const [key, value] of this.userSocketMap.entries()) {
          if (String(value.userId) === String(userId)) {
            targetSocketId = value.socketId;
            break; // Stop searching once we've found the userId
          }
        }

        if (targetSocketId) {
          console.log("data", data);
          this.io.to(targetSocketId).emit("list-invitation-socket", {
            data,
          });
        }
      });

      socket.on("register-user-id", (data) => {
        const { accessTokenJWT, socketId } = data;

        const decoded = jwt.decode(accessTokenJWT);
        if (
          typeof decoded === "object" &&
          decoded !== null &&
          "userInfo" in decoded
        ) {
          const userId = decoded.userInfo.id.toString();
          // Array.from(this.userSocketMap.entries()).forEach(([key, value]) => {
          //   if (value.userId === userId) {
          //     this.userSocketMap.delete(key); // Remove old entry to prevent many
          //   }
          // });

          this.userSocketMap.forEach((value, key) => {
            if (value.userId === userId) {
              this.userSocketMap.delete(key);
            }
          });

          if (this.userSocketMap.has(socketId)) {
            this.userSocketMap.set(socketId, {
              socketId: socket.id,
              userId,
            });
          }
          console.log(
            `Registering or updating userId ${userId} with socketId ${socket.id}`
          );
        }

        console.log("this.userSocketId", this.userSocketMap);
      });
    });
  }

  private listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

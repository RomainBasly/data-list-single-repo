import express from "express";
import http from "http";
import { Server as IOServer, Socket } from "socket.io";
import dotenv from "dotenv";
import { randomBytes } from "node:crypto";

export class SocketService {
  private expressApp: express.Application;
  private httpServer: http.Server;
  private io: IOServer;
  private readonly port: string | number;
  private static instance: SocketService;
  private userSocketMap: Map<
    string,
    { socketConnectionId: string; userId: string | null }
  >;
  constructor() {
    this.expressApp = express();
    this.httpServer = http.createServer();
    this.io = new IOServer(this.httpServer, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:8000"], // Allowed origins
        methods: ["GET", "POST"], // Allowed HTTP request methods
        allowedHeaders: ["my-custom-header"], // Custom headers that can be sent
        credentials: true, // Allow sending of cookies and credentials
      },
    });
    this.port = process.env.PORT || 3002;
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
      const socketConnectionId = randomBytes(16).toString("hex");
      socket.emit("assign-id", {
        socketConnectionId: socketConnectionId,
        userId: null,
      });
      this.userSocketMap.set(socketConnectionId, {
        socketConnectionId: socket.id,
        userId: null,
      });
      socket.on("ping", () => {
        socket.emit("pong");
      });
      socket.on("disconnect", () => {
        this.userSocketMap.delete(socketConnectionId);
        console.log("client disconnected");
      });

      socket.on("list-invitation-backend", (data: any) => {
        const { userId, listId } = data;
        console.log("data", data);
        console.log("this.userSocketMap", this.userSocketMap.entries());

        let targetSocketId: string | undefined;

        // Iterate over the map to find the matching userId
        for (const [key, value] of this.userSocketMap.entries()) {
          if (String(value.userId) === String(userId)) {
            targetSocketId = value.socketConnectionId;
            break; // Stop searching once we've found the userId
          }
        }

        console.log("targetSocketId", targetSocketId);

        if (targetSocketId) {
          this.io
            .to(targetSocketId)
            .emit("list-invitation-socket", { userId, listId });
        }
      });

      socket.on("register-user-id", (data) => {
        const { userId, socketConnectionId } = data;

        Array.from(this.userSocketMap.entries()).forEach(([key, value]) => {
          if (value.userId === userId) {
            this.userSocketMap.delete(key); // Remove old entry
          }
        });

        if (this.userSocketMap.has(socketConnectionId)) {
          this.userSocketMap.set(socketConnectionId, {
            socketConnectionId: socket.id,
            userId,
          });
        }
      });
    });
  }

  private listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

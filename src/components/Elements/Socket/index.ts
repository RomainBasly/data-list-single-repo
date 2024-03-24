import { DefaultEventsMap } from "@socket.io/component-emitter";
import assert from "assert";
import { Socket, io } from "socket.io-client";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const getSocket = () => {
  if (!socket) {
    assert(
      process.env.NEXT_PUBLIC_SOCKET_URL,
      "error getting the socket url from env"
    );
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    // Setup your event listeners here
    socket.on("connect", () => {
      console.log("Connected to the socket Server")
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the socket server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }
  return socket;
};

import dotenv from "dotenv";
import { SocketService } from "./services/SocketService";

dotenv.config();

class Main {
  // element necessary to the constructor
  // constructor
  public async start() {
    console.info("socket started");
    SocketService.getInstance();
  }
}

new Main().start();

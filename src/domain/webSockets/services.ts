import { io as ioClient } from 'socket.io-client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class WebSocketClientService {
  private socket;
  private url;

  constructor() {
    this.url = process.env.SOCKET_URL || '';
    this.socket = ioClient(this.url);

    this.socket.on('connect', () => {
      console.log('connect to the Websocket Server');
    });

    this.initializeListeners();
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  private initializeListeners() {
    this.socket.on('disconnect', () => {
      console.log('disconnect');
      this.socket.disconnect();
    });

    this.socket.on('From Api', (data) => {
      console.log('received data', data);
    });
  }
}

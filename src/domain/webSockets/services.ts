import { io as ioClient } from 'socket.io-client';

export class WebSocketClientService {
  private socket;

  constructor(url: string) {
    this.socket = ioClient(url);

    this.socket.on('connect', () => {
      console.log('connect to the Websocket Server');
    });

    this.initializeListeners();
  }

  public emit(eventName: string, data: any) {
    this.socket.emit('Received data', data);
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

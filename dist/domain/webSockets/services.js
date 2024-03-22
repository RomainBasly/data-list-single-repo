"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClientService = void 0;
const socket_io_client_1 = require("socket.io-client");
class WebSocketClientService {
    constructor(url) {
        this.socket = (0, socket_io_client_1.io)(url);
        this.socket.on('connect', () => {
            console.log('connect to the Websocket Server');
        });
        this.initializeListeners();
    }
    emit(eventName, data) {
        this.socket.emit('Received data', data);
    }
    initializeListeners() {
        this.socket.on('disconnect', () => {
            console.log('disconnect');
            this.socket.disconnect();
        });
        this.socket.on('From Api', (data) => {
            console.log('received data', data);
        });
    }
}
exports.WebSocketClientService = WebSocketClientService;

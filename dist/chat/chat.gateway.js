"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    chatService;
    logger = new common_1.Logger(ChatGateway_1.name);
    server;
    constructor(chatService) {
        this.chatService = chatService;
    }
    handleConnection(client) {
        this.logger.debug('Client connected: ' + client.id);
    }
    handleDisconnect(client) {
        this.logger.debug('Client disconnected: ' + client.id);
    }
    handleJoin(client, payload) {
        if (!payload.courseId) {
            client.emit('error', { message: 'courseId is required to join chat' });
            return;
        }
        client.join(payload.courseId);
        client.emit('joined', { courseId: payload.courseId });
    }
    async handleMessage(client, payload) {
        if (!payload.courseId || !payload.senderId || !payload.content) {
            client.emit('error', { message: 'courseId, senderId and content are required' });
            return;
        }
        try {
            const message = await this.chatService.createMessage(payload.courseId, payload.senderId, payload.content);
            this.server.to(payload.courseId).emit('message', message);
        }
        catch (error) {
            client.emit('error', { message: error.message });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'chat', cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map
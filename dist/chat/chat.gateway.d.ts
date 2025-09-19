import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
interface JoinPayload {
    courseId: string;
}
interface MessagePayload {
    courseId: string;
    senderId: string;
    content: string;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly logger;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(client: Socket, payload: JoinPayload): void;
    handleMessage(client: Socket, payload: MessagePayload): Promise<void>;
}
export {};

import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(_client: Socket): void;
    handleDisconnect(_client: Socket): void;
    onJoinCourse(client: Socket, data: {
        courseId: string;
    }): Promise<void>;
    onMessage(_client: Socket, data: {
        courseId: string;
        senderId: string;
        content: string;
        recipientId?: string;
    }): Promise<void>;
}

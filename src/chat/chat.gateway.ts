import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.debug('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: JoinPayload) {
    if (!payload.courseId) {
      client.emit('error', { message: 'courseId is required to join chat' });
      return;
    }
    client.join(payload.courseId);
    client.emit('joined', { courseId: payload.courseId });
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: MessagePayload) {
    if (!payload.courseId || !payload.senderId || !payload.content) {
      client.emit('error', { message: 'courseId, senderId and content are required' });
      return;
    }

    try {
      const message = await this.chatService.createMessage(payload.courseId, payload.senderId, payload.content);
      this.server.to(payload.courseId).emit('message', message);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}

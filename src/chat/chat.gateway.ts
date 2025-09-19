import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(_client: Socket) {
    // no-op: auth could be verified here
  }

  handleDisconnect(_client: Socket) {
    // no-op
  }

  @SubscribeMessage('joinCourse')
  async onJoinCourse(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { courseId: string },
  ) {
    if (!data?.courseId) return;
    await client.join('course:' + data.courseId);
  }

  @SubscribeMessage('message')
  async onMessage(
    @ConnectedSocket() _client: Socket,
    @MessageBody()
    data: {
      courseId: string;
      senderId: string;
      content: string;
      recipientId?: string;
    },
  ) {
    if (!data?.courseId || !data?.senderId || !data?.content) return;

    try {
      const message = await this.chatService.createMessage(
        data.courseId,
        data.senderId,
        data.content,
        data.recipientId,
      );
      this.server.to('course:' + data.courseId).emit('message', message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      _client.emit('message_error', { message: errorMessage });
    }
  }
}

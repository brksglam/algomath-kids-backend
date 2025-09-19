import type { Request } from 'express';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatMessageDto: CreateChatMessageDto, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/chat-message.schema").ChatMessage, {}, {}> & import("./schemas/chat-message.schema").ChatMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/chat-message.schema").ChatMessage, {}, {}> & import("./schemas/chat-message.schema").ChatMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}

import { Model, Types } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { CourseDocument } from '../courses/schemas/course.schema';
export declare class ChatService {
    private readonly chatModel;
    private readonly courseModel;
    constructor(chatModel: Model<ChatMessageDocument>, courseModel: Model<CourseDocument>);
    createMessage(courseId: string, senderId: string, content: string): Promise<import("mongoose").Document<unknown, {}, ChatMessage, {}, {}> & ChatMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, ChatMessage, {}, {}> & ChatMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
}

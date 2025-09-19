import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type ChatMessageDocument = HydratedDocument<ChatMessage>;
export declare class ChatMessage {
    course?: Types.ObjectId;
    sender: Types.ObjectId;
    recipient?: Types.ObjectId;
    content: string;
    createdAt: Date;
}
export declare const ChatMessageSchema: MongooseSchema<ChatMessage, import("mongoose").Model<ChatMessage, any, any, any, import("mongoose").Document<unknown, any, ChatMessage, any, {}> & ChatMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatMessage, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChatMessage>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ChatMessage> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

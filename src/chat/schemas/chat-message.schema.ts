import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema({ timestamps: true })
export class ChatMessage {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course' })
  course?: Types.ObjectId; // course feed mesajı

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  recipient?: Types.ObjectId; // DM için hedef kullanıcı

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

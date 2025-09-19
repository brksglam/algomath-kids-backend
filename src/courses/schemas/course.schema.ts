import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ _id: false })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

@Schema({ _id: false })
export class CourseDocumentEntry {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;
}

export const CourseDocumentEntrySchema = SchemaFactory.createForClass(CourseDocumentEntry);

@Schema({ _id: false })
export class Assignment {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  dueDate?: Date;

  @Prop({ default: Date.now })
  assignedAt: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);

@Schema({ _id: false })
export class ChatMessage {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: User.name }], default: [] })
  teachers: Types.ObjectId[];

  @Prop({ type: [QuizSchema], default: [] })
  quizzes: Quiz[];

  @Prop({ type: [CourseDocumentEntrySchema], default: [] })
  documents: CourseDocumentEntry[];

  @Prop({ type: [AssignmentSchema], default: [] })
  assignments: Assignment[];

  @Prop({ type: [ChatMessageSchema], default: [] })
  chatMessages: ChatMessage[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

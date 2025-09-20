import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ChatPolicy } from '../../common/enums/chat-policy.enum';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  teachers: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  students: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DocumentEntity' }],
    default: [],
  })
  documents: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Assignment' }],
    default: [],
  })
  assignments: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Quiz' }],
    default: [],
  })
  quizzes: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ChatMessage' }],
    default: [],
  })
  chats: Types.ObjectId[];

  @Prop({
    type: String,
    enum: ChatPolicy,
    default: ChatPolicy.StudentsWithTeacher,
  })
  chatPolicy: ChatPolicy;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

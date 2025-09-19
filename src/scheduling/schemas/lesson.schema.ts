import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

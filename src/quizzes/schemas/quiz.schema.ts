import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ _id: false })
export class QuizQuestion {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;
}

const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [QuizQuestionSchema], default: [] })
  questions: QuizQuestion[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

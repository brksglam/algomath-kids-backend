import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type TeacherProfileDocument = HydratedDocument<TeacherProfile>;

@Schema({ timestamps: true })
export class TeacherProfile {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  subjects: string[];

  @Prop()
  bio?: string;

  @Prop({ type: [String], default: [] })
  certifications: string[];
}

export const TeacherProfileSchema =
  SchemaFactory.createForClass(TeacherProfile);

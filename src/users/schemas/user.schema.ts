import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from '../../common/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Role, default: Role.Student })
  role: Role;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }], default: [] })
  courses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

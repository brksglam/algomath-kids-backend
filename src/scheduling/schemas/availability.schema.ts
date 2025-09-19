import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true })
export class Availability {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  teacher: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  weeklySlots: string[]; // örn: MON-09:00-11:00, WED-14:00-16:00
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

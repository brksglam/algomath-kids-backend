import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type DocumentEntityDocument = HydratedDocument<DocumentEntity>;

@Schema({ timestamps: true })
export class DocumentEntity {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }], default: [] })
  recipients: Types.ObjectId[];
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({ _id: false })
export class AssignmentSubmission {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

const AssignmentSubmissionSchema =
  SchemaFactory.createForClass(AssignmentSubmission);

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  deadline?: Date;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  assignedTo: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  recipients: Types.ObjectId[];

  @Prop({ type: [AssignmentSubmissionSchema], default: [] })
  submissions: AssignmentSubmission[];
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);

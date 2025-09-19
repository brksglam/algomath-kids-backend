import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type AssignmentDocument = HydratedDocument<Assignment>;
export declare class AssignmentSubmission {
    student: Types.ObjectId;
    url: string;
    submittedAt: Date;
}
export declare class Assignment {
    course: Types.ObjectId;
    title: string;
    description?: string;
    deadline?: Date;
    assignedTo: Types.ObjectId[];
    submissions: AssignmentSubmission[];
}
export declare const AssignmentSchema: MongooseSchema<Assignment, import("mongoose").Model<Assignment, any, any, any, import("mongoose").Document<unknown, any, Assignment, any, {}> & Assignment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Assignment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Assignment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Assignment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

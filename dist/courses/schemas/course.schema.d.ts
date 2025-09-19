import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ChatPolicy } from '../../common/enums/chat-policy.enum';
export type CourseDocument = HydratedDocument<Course>;
export declare class Course {
    title: string;
    description?: string;
    teachers: Types.ObjectId[];
    students: Types.ObjectId[];
    documents: Types.ObjectId[];
    assignments: Types.ObjectId[];
    quizzes: Types.ObjectId[];
    chats: Types.ObjectId[];
    chatPolicy: ChatPolicy;
}
export declare const CourseSchema: MongooseSchema<Course, import("mongoose").Model<Course, any, any, any, import("mongoose").Document<unknown, any, Course, any, {}> & Course & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Course>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Course> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

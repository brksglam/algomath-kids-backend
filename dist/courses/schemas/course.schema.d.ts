import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type CourseDocument = HydratedDocument<Course>;
export declare class Quiz {
    title: string;
    description?: string;
    createdAt: Date;
}
export declare const QuizSchema: MongooseSchema<Quiz, import("mongoose").Model<Quiz, any, any, any, import("mongoose").Document<unknown, any, Quiz, any, {}> & Quiz & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quiz, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Quiz>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Quiz> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class CourseDocumentEntry {
    name: string;
    url: string;
    description?: string;
    uploadedAt: Date;
}
export declare const CourseDocumentEntrySchema: MongooseSchema<CourseDocumentEntry, import("mongoose").Model<CourseDocumentEntry, any, any, any, import("mongoose").Document<unknown, any, CourseDocumentEntry, any, {}> & CourseDocumentEntry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CourseDocumentEntry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CourseDocumentEntry>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CourseDocumentEntry> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Assignment {
    title: string;
    description?: string;
    dueDate?: Date;
    assignedAt: Date;
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
export declare class ChatMessage {
    sender: Types.ObjectId;
    message: string;
    sentAt: Date;
}
export declare const ChatMessageSchema: MongooseSchema<ChatMessage, import("mongoose").Model<ChatMessage, any, any, any, import("mongoose").Document<unknown, any, ChatMessage, any, {}> & ChatMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatMessage, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChatMessage>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ChatMessage> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Course {
    title: string;
    description?: string;
    teachers: Types.ObjectId[];
    quizzes: Quiz[];
    documents: CourseDocumentEntry[];
    assignments: Assignment[];
    chatMessages: ChatMessage[];
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

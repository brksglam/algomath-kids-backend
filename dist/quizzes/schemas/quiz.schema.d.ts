import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type QuizDocument = HydratedDocument<Quiz>;
export declare class QuizQuestion {
    text: string;
    options: string[];
    correctAnswer: string;
}
export declare class Quiz {
    course: Types.ObjectId;
    title: string;
    description?: string;
    questions: QuizQuestion[];
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

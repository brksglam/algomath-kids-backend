import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type LessonDocument = HydratedDocument<Lesson>;
export declare class Lesson {
    teacher: Types.ObjectId;
    student: Types.ObjectId;
    course: Types.ObjectId;
    startAt: Date;
    endAt: Date;
}
export declare const LessonSchema: MongooseSchema<Lesson, import("mongoose").Model<Lesson, any, any, any, import("mongoose").Document<unknown, any, Lesson, any, {}> & Lesson & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lesson, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Lesson>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Lesson> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

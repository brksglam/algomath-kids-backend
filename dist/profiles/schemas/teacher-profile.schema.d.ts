import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type TeacherProfileDocument = HydratedDocument<TeacherProfile>;
export declare class TeacherProfile {
    user: Types.ObjectId;
    subjects: string[];
    bio?: string;
    certifications: string[];
}
export declare const TeacherProfileSchema: MongooseSchema<TeacherProfile, import("mongoose").Model<TeacherProfile, any, any, any, import("mongoose").Document<unknown, any, TeacherProfile, any, {}> & TeacherProfile & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeacherProfile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TeacherProfile>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TeacherProfile> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

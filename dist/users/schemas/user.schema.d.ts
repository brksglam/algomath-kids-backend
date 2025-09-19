import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from '../../common/enums/roles.enum';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    email: string;
    password: string;
    name: string;
    role: Role;
    courses: Types.ObjectId[];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

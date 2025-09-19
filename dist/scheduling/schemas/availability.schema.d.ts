import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type AvailabilityDocument = HydratedDocument<Availability>;
export declare class Availability {
    teacher: Types.ObjectId;
    weeklySlots: string[];
}
export declare const AvailabilitySchema: MongooseSchema<Availability, import("mongoose").Model<Availability, any, any, any, import("mongoose").Document<unknown, any, Availability, any, {}> & Availability & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Availability, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Availability>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Availability> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

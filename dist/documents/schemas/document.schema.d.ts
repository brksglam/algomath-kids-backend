import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type DocumentEntityDocument = HydratedDocument<DocumentEntity>;
export declare class DocumentEntity {
    course: Types.ObjectId;
    title: string;
    description?: string;
    url: string;
    uploadedBy: Types.ObjectId;
}
export declare const DocumentSchema: MongooseSchema<DocumentEntity, import("mongoose").Model<DocumentEntity, any, any, any, import("mongoose").Document<unknown, any, DocumentEntity, any, {}> & DocumentEntity & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentEntity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DocumentEntity>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DocumentEntity> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

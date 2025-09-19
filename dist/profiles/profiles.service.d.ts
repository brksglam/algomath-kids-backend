import { Model, Types } from 'mongoose';
import { TeacherProfile, TeacherProfileDocument } from './schemas/teacher-profile.schema';
export declare class ProfilesService {
    private readonly profileModel;
    constructor(profileModel: Model<TeacherProfileDocument>);
    upsert(userId: string, data: Partial<TeacherProfile>): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, TeacherProfile, {}, {}> & TeacherProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    findByUser(userId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, TeacherProfile, {}, {}> & TeacherProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
}

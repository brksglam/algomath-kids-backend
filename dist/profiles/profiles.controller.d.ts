import { ProfilesService } from './profiles.service';
declare class UpsertProfileDto {
    subjects?: string[];
    bio?: string;
    certifications?: string[];
}
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    upsert(userId: string, dto: UpsertProfileDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/teacher-profile.schema").TeacherProfile, {}, {}> & import("./schemas/teacher-profile.schema").TeacherProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    get(userId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/teacher-profile.schema").TeacherProfile, {}, {}> & import("./schemas/teacher-profile.schema").TeacherProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
export {};

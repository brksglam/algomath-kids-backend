import { SchedulingService } from './scheduling.service';
declare class UpsertAvailabilityDto {
    weeklySlots: string[];
}
declare class CreateLessonDto {
    teacherId: string;
    studentId: string;
    courseId: string;
    startAt: string;
    endAt: string;
}
export declare class SchedulingController {
    private readonly schedulingService;
    constructor(schedulingService: SchedulingService);
    upsertAvailability(teacherId: string, dto: UpsertAvailabilityDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/availability.schema").Availability, {}, {}> & import("./schemas/availability.schema").Availability & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAvailability(teacherId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/availability.schema").Availability, {}, {}> & import("./schemas/availability.schema").Availability & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createLesson(dto: CreateLessonDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lesson.schema").Lesson, {}, {}> & import("./schemas/lesson.schema").Lesson & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    listByTeacher(teacherId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/lesson.schema").Lesson, {}, {}> & import("./schemas/lesson.schema").Lesson & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    listByStudent(studentId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/lesson.schema").Lesson, {}, {}> & import("./schemas/lesson.schema").Lesson & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
export {};

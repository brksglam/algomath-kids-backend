import { Model, Types } from 'mongoose';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
export declare class SchedulingService {
    private readonly availabilityModel;
    private readonly lessonModel;
    constructor(availabilityModel: Model<AvailabilityDocument>, lessonModel: Model<LessonDocument>);
    upsertAvailability(teacherId: string, weeklySlots: string[]): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Availability, {}, {}> & Availability & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    getAvailability(teacherId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Availability, {}, {}> & Availability & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    createLesson(teacherId: string, studentId: string, courseId: string, startAt: Date, endAt: Date): Promise<import("mongoose").Document<unknown, {}, Lesson, {}, {}> & Lesson & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    listLessonsByTeacher(teacherId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Lesson, {}, {}> & Lesson & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    listLessonsByStudent(studentId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Lesson, {}, {}> & Lesson & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
}

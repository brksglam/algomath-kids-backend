import { Model, Types } from 'mongoose';
import { ManageCourseMemberDto } from './dto/manage-course-member.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { UserDocument } from '../users/schemas/user.schema';
export declare class CoursesService {
    private readonly courseModel;
    private readonly userModel;
    constructor(courseModel: Model<CourseDocument>, userModel: Model<UserDocument>);
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findAllPaginated(page: number, limit: number): Promise<{
        items: unknown[];
        total: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    findOneWithRelations(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
    addTeacher(courseId: string, manageCourseMemberDto: ManageCourseMemberDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeTeacher(courseId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addStudent(courseId: string, manageCourseMemberDto: ManageCourseMemberDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeStudent(courseId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    private mapToObjectIds;
    private ensureUserExists;
    private addCourseReference;
    private refreshCourseReferences;
    private removeCourseReference;
}

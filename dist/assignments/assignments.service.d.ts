import { Model, Types } from 'mongoose';
import { StorageService } from '../storage/storage.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Assignment, AssignmentDocument } from './schemas/assignment.schema';
import { CourseDocument } from '../courses/schemas/course.schema';
export declare class AssignmentsService {
    private readonly assignmentModel;
    private readonly courseModel;
    private readonly storageService;
    constructor(assignmentModel: Model<AssignmentDocument>, courseModel: Model<CourseDocument>, storageService: StorageService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findByCoursePaginated(courseId: string, page: number, limit: number): Promise<{
        items: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    assignStudents(id: string, assignStudentsDto: AssignStudentsDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    submit(id: string, studentId: string, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Assignment, {}, {}> & Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}

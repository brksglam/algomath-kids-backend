import type { Request } from 'express';
import { AssignmentsService } from './assignments.service';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema").Assignment, {}, {}> & import("./schemas/assignment.schema").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string, page?: number, limit?: number): Promise<{
        items: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema").Assignment, {}, {}> & import("./schemas/assignment.schema").Assignment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema").Assignment, {}, {}> & import("./schemas/assignment.schema").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    assignStudents(id: string, assignStudentsDto: AssignStudentsDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema").Assignment, {}, {}> & import("./schemas/assignment.schema").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
    submit(id: string, file: Express.Multer.File, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema").Assignment, {}, {}> & import("./schemas/assignment.schema").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}

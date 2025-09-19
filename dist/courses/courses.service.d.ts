import { Model, Types } from 'mongoose';
import { MessagingService } from '../messaging/messaging.service';
import { StorageService } from '../storage/storage.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ManageTeacherDto } from './dto/manage-teacher.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { Course, CourseDocument } from './schemas/course.schema';
export declare class CoursesService {
    private readonly courseModel;
    private readonly storageService;
    private readonly messagingService;
    constructor(courseModel: Model<CourseDocument>, storageService: StorageService, messagingService: MessagingService);
    private getCourseOrThrow;
    addTeacher(courseId: string, manageTeacherDto: ManageTeacherDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    removeTeacher(courseId: string, teacherId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    createQuiz(courseId: string, createQuizDto: CreateQuizDto): Promise<{
        title: string;
        description: string | undefined;
        createdAt: Date;
    }>;
    getQuizzes(courseId: string): Promise<import("./schemas/course.schema").Quiz[]>;
    addDocument(courseId: string, file: Express.Multer.File, uploadDocumentDto: UploadDocumentDto): Promise<{
        name: string;
        description: string | undefined;
        url: string;
        uploadedAt: Date;
    }>;
    addAssignment(courseId: string, createAssignmentDto: CreateAssignmentDto): Promise<{
        title: string;
        description: string | undefined;
        dueDate: Date | undefined;
        assignedAt: Date;
    }>;
    addChatMessage(courseId: string, createChatMessageDto: CreateChatMessageDto): Promise<{
        sender: Types.ObjectId;
        message: string;
        sentAt: Date;
    }>;
}

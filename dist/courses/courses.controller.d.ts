import type { Request } from 'express';
import { ManageCourseMemberDto } from './dto/manage-course-member.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesService } from './courses.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { DocumentsService } from '../documents/documents.service';
import { AssignmentsService } from '../assignments/assignments.service';
import { ChatService } from '../chat/chat.service';
import { CreateQuizDto } from '../quizzes/dto/create-quiz.dto';
import { CreateDocumentDto } from '../documents/dto/create-document.dto';
import { CreateAssignmentDto } from '../assignments/dto/create-assignment.dto';
import { CreateChatMessageDto } from '../chat/dto/create-chat-message.dto';
export declare class CoursesController {
    private readonly coursesService;
    private readonly quizzesService;
    private readonly documentsService;
    private readonly assignmentsService;
    private readonly chatService;
    constructor(coursesService: CoursesService, quizzesService: QuizzesService, documentsService: DocumentsService, assignmentsService: AssignmentsService, chatService: ChatService);
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getDetail(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
    addTeacher(id: string, manageCourseMemberDto: ManageCourseMemberDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeTeacher(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addStudent(id: string, manageCourseMemberDto: ManageCourseMemberDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeStudent(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createQuiz(courseId: string, dto: Omit<CreateQuizDto, 'courseId'> & Partial<CreateQuizDto>): Promise<import("mongoose").Document<unknown, {}, import("../quizzes/schemas/quiz.schema").Quiz, {}, {}> & import("../quizzes/schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    listQuizzes(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../quizzes/schemas/quiz.schema").Quiz, {}, {}> & import("../quizzes/schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createDocument(courseId: string, dto: Omit<CreateDocumentDto, 'courseId'> & Partial<CreateDocumentDto>, file: Express.Multer.File, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../documents/schemas/document.schema").DocumentEntity, {}, {}> & import("../documents/schemas/document.schema").DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createAssignment(courseId: string, dto: Omit<CreateAssignmentDto, 'courseId'> & Partial<CreateAssignmentDto>): Promise<import("mongoose").Document<unknown, {}, import("../assignments/schemas/assignment.schema").Assignment, {}, {}> & import("../assignments/schemas/assignment.schema").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createChatMessage(courseId: string, dto: Pick<CreateChatMessageDto, 'content'>, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../chat/schemas/chat-message.schema").ChatMessage, {}, {}> & import("../chat/schemas/chat-message.schema").ChatMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}

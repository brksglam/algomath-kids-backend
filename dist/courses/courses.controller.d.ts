import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ManageTeacherDto } from './dto/manage-teacher.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    addTeacher(id: string, manageTeacherDto: ManageTeacherDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeTeacher(id: string, teacherId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./schemas/course.schema").Course, {}, {}> & import("./schemas/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createQuiz(id: string, createQuizDto: CreateQuizDto): Promise<{
        title: string;
        description: string | undefined;
        createdAt: Date;
    }>;
    getQuizzes(id: string): Promise<import("./schemas/course.schema").Quiz[]>;
    addDocument(id: string, file: Express.Multer.File, uploadDocumentDto: UploadDocumentDto): Promise<{
        name: string;
        description: string | undefined;
        url: string;
        uploadedAt: Date;
    }>;
    addAssignment(id: string, createAssignmentDto: CreateAssignmentDto): Promise<{
        title: string;
        description: string | undefined;
        dueDate: Date | undefined;
        assignedAt: Date;
    }>;
    addChatMessage(id: string, createChatMessageDto: CreateChatMessageDto): Promise<{
        sender: import("mongoose").Types.ObjectId;
        message: string;
        sentAt: Date;
    }>;
}

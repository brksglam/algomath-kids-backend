import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { CourseDocument } from '../courses/schemas/course.schema';
import { MessagingService } from '../messaging/messaging.service';
export declare class QuizzesService {
    private readonly quizModel;
    private readonly courseModel;
    private readonly messagingService;
    constructor(quizModel: Model<QuizDocument>, courseModel: Model<CourseDocument>, messagingService: MessagingService);
    create(createQuizDto: CreateQuizDto): Promise<import("mongoose").Document<unknown, {}, Quiz, {}, {}> & Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Quiz, {}, {}> & Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Quiz, {}, {}> & Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Quiz, {}, {}> & Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
    submit(id: string, studentId: string, submitQuizDto: SubmitQuizDto): Promise<{
        quizId: string;
        studentId: string;
        total: number;
        correct: number;
        incorrect: number;
    }>;
}

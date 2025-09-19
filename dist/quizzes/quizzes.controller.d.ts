import type { Request } from 'express';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(createQuizDto: CreateQuizDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").Quiz, {}, {}> & import("./schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").Quiz, {}, {}> & import("./schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").Quiz, {}, {}> & import("./schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").Quiz, {}, {}> & import("./schemas/quiz.schema").Quiz & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
    submit(id: string, submitQuizDto: SubmitQuizDto, req: Request): Promise<{
        quizId: string;
        studentId: string;
        total: number;
        correct: number;
        incorrect: number;
    }>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quiz_schema_1 = require("./schemas/quiz.schema");
const course_schema_1 = require("../courses/schemas/course.schema");
const messaging_service_1 = require("../messaging/messaging.service");
let QuizzesService = class QuizzesService {
    quizModel;
    courseModel;
    messagingService;
    constructor(quizModel, courseModel, messagingService) {
        this.quizModel = quizModel;
        this.courseModel = courseModel;
        this.messagingService = messagingService;
    }
    async create(createQuizDto) {
        const course = await this.courseModel.findById(createQuizDto.courseId).exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        createQuizDto.questions.forEach((question, index) => {
            if (!question.options.includes(question.correctAnswer)) {
                throw new common_1.BadRequestException('Question ' + (index + 1) + ' correct answer must be one of the options');
            }
        });
        const quiz = await this.quizModel.create({
            course: course._id,
            title: createQuizDto.title,
            description: createQuizDto.description,
            questions: createQuizDto.questions,
        });
        await this.courseModel
            .findByIdAndUpdate(course._id, { $addToSet: { quizzes: quiz._id } })
            .exec();
        await this.messagingService.publish('quiz.created', {
            quizId: quiz.id,
            courseId: course.id,
            title: quiz.title,
        });
        return quiz.toObject();
    }
    async findByCourse(courseId) {
        return this.quizModel.find({ course: courseId }).lean().exec();
    }
    async findByCoursePaginated(courseId, page, limit) {
        const [items, total] = await Promise.all([
            this.quizModel
                .find({ course: courseId })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .exec(),
            this.quizModel.countDocuments({ course: courseId }).exec(),
        ]);
        return { items, total, page, limit };
    }
    async findOne(id) {
        const quiz = await this.quizModel.findById(id).lean().exec();
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        return quiz;
    }
    async update(id, updateQuizDto) {
        if (updateQuizDto.questions) {
            updateQuizDto.questions.forEach((question, index) => {
                if (!question.options.includes(question.correctAnswer)) {
                    throw new common_1.BadRequestException('Question ' + (index + 1) + ' correct answer must be one of the options');
                }
            });
        }
        const quiz = await this.quizModel
            .findByIdAndUpdate(id, { $set: updateQuizDto }, { new: true })
            .lean()
            .exec();
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        return quiz;
    }
    async remove(id) {
        const quiz = await this.quizModel.findByIdAndDelete(id).exec();
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        await this.courseModel.findByIdAndUpdate(quiz.course, { $pull: { quizzes: quiz._id } }).exec();
    }
    async submit(id, studentId, submitQuizDto) {
        const quiz = await this.quizModel.findById(id).lean().exec();
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const total = quiz.questions.length;
        const answers = submitQuizDto.answers;
        if (answers.length !== total) {
            throw new common_1.BadRequestException('Answers count must match questions count');
        }
        let correct = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                correct += 1;
            }
        });
        return {
            quizId: id,
            studentId,
            total,
            correct,
            incorrect: total - correct,
        };
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quiz_schema_1.Quiz.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        messaging_service_1.MessagingService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map
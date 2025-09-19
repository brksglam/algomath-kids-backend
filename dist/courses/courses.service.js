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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const messaging_service_1 = require("../messaging/messaging.service");
const storage_service_1 = require("../storage/storage.service");
const course_schema_1 = require("./schemas/course.schema");
let CoursesService = class CoursesService {
    courseModel;
    storageService;
    messagingService;
    constructor(courseModel, storageService, messagingService) {
        this.courseModel = courseModel;
        this.storageService = storageService;
        this.messagingService = messagingService;
    }
    async getCourseOrThrow(courseId) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return course;
    }
    async addTeacher(courseId, manageTeacherDto) {
        const course = await this.getCourseOrThrow(courseId);
        const teacherObjectId = new mongoose_2.Types.ObjectId(manageTeacherDto.teacherId);
        const alreadyAssigned = course.teachers.some((teacher) => teacher.equals(teacherObjectId));
        if (!alreadyAssigned) {
            course.teachers.push(teacherObjectId);
            await course.save();
        }
        return course;
    }
    async removeTeacher(courseId, teacherId) {
        const course = await this.getCourseOrThrow(courseId);
        course.teachers = course.teachers.filter((teacher) => teacher.toString() !== teacherId);
        await course.save();
        return course;
    }
    async createQuiz(courseId, createQuizDto) {
        const course = await this.getCourseOrThrow(courseId);
        const quiz = {
            title: createQuizDto.title,
            description: createQuizDto.description,
            createdAt: new Date(),
        };
        course.quizzes.push(quiz);
        await course.save();
        await this.messagingService.publish('quizCreated', {
            courseId,
            quiz: {
                title: quiz.title,
                description: quiz.description,
            },
        });
        return quiz;
    }
    async getQuizzes(courseId) {
        const course = await this.getCourseOrThrow(courseId);
        return course.quizzes;
    }
    async addDocument(courseId, file, uploadDocumentDto) {
        const course = await this.getCourseOrThrow(courseId);
        const uploadPath = 'courses/' + courseId + '/documents';
        const uploadedUrl = await this.storageService.upload(file, uploadPath);
        const documentEntry = {
            name: uploadDocumentDto.name ?? file.originalname,
            description: uploadDocumentDto.description,
            url: uploadedUrl,
            uploadedAt: new Date(),
        };
        course.documents.push(documentEntry);
        await course.save();
        await this.messagingService.publish('documentUploaded', {
            courseId,
            document: {
                name: documentEntry.name,
                url: documentEntry.url,
            },
        });
        return documentEntry;
    }
    async addAssignment(courseId, createAssignmentDto) {
        const course = await this.getCourseOrThrow(courseId);
        const assignment = {
            title: createAssignmentDto.title,
            description: createAssignmentDto.description,
            dueDate: createAssignmentDto.dueDate ? new Date(createAssignmentDto.dueDate) : undefined,
            assignedAt: new Date(),
        };
        course.assignments.push(assignment);
        await course.save();
        return assignment;
    }
    async addChatMessage(courseId, createChatMessageDto) {
        const course = await this.getCourseOrThrow(courseId);
        const message = {
            sender: new mongoose_2.Types.ObjectId(createChatMessageDto.senderId),
            message: createChatMessageDto.message,
            sentAt: new Date(),
        };
        course.chatMessages.push(message);
        await course.save();
        return message;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        storage_service_1.StorageService,
        messaging_service_1.MessagingService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map
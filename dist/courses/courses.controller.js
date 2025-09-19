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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = __importDefault(require("multer"));
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const create_chat_message_dto_1 = require("./dto/create-chat-message.dto");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const manage_teacher_dto_1 = require("./dto/manage-teacher.dto");
const upload_document_dto_1 = require("./dto/upload-document.dto");
const courses_service_1 = require("./courses.service");
let CoursesController = class CoursesController {
    coursesService;
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    addTeacher(id, manageTeacherDto) {
        return this.coursesService.addTeacher(id, manageTeacherDto);
    }
    removeTeacher(id, teacherId) {
        return this.coursesService.removeTeacher(id, teacherId);
    }
    createQuiz(id, createQuizDto) {
        return this.coursesService.createQuiz(id, createQuizDto);
    }
    getQuizzes(id) {
        return this.coursesService.getQuizzes(id);
    }
    addDocument(id, file, uploadDocumentDto) {
        return this.coursesService.addDocument(id, file, uploadDocumentDto);
    }
    addAssignment(id, createAssignmentDto) {
        return this.coursesService.addAssignment(id, createAssignmentDto);
    }
    addChatMessage(id, createChatMessageDto) {
        return this.coursesService.addChatMessage(id, createChatMessageDto);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(':id/teachers'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manage_teacher_dto_1.ManageTeacherDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Delete)(':id/teachers/:teacherId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "removeTeacher", null);
__decorate([
    (0, common_1.Post)(':id/quizzes'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Teacher),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Get)(':id/quizzes'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getQuizzes", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Teacher),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: multer_1.default.memoryStorage() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, upload_document_dto_1.UploadDocumentDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addDocument", null);
__decorate([
    (0, common_1.Post)(':id/assignments'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Teacher),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addAssignment", null);
__decorate([
    (0, common_1.Post)(':id/chat'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Teacher, roles_enum_1.Role.Student, roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_chat_message_dto_1.CreateChatMessageDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addChatMessage", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map
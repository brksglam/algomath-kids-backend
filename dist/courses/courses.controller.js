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
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = __importDefault(require("multer"));
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const manage_course_member_dto_1 = require("./dto/manage-course-member.dto");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const courses_service_1 = require("./courses.service");
const quizzes_service_1 = require("../quizzes/quizzes.service");
const documents_service_1 = require("../documents/documents.service");
const assignments_service_1 = require("../assignments/assignments.service");
const chat_service_1 = require("../chat/chat.service");
let CoursesController = class CoursesController {
    coursesService;
    quizzesService;
    documentsService;
    assignmentsService;
    chatService;
    constructor(coursesService, quizzesService, documentsService, assignmentsService, chatService) {
        this.coursesService = coursesService;
        this.quizzesService = quizzesService;
        this.documentsService = documentsService;
        this.assignmentsService = assignmentsService;
        this.chatService = chatService;
    }
    create(createCourseDto) {
        return this.coursesService.create(createCourseDto);
    }
    findAll(page = 1, limit = 10) {
        return this.coursesService.findAllPaginated(+page, +limit);
    }
    getDetail(id) {
        return this.coursesService.findOneWithRelations(id);
    }
    update(id, updateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }
    remove(id) {
        return this.coursesService.remove(id);
    }
    addTeacher(id, manageCourseMemberDto) {
        return this.coursesService.addTeacher(id, manageCourseMemberDto);
    }
    removeTeacher(id, userId) {
        return this.coursesService.removeTeacher(id, userId);
    }
    addStudent(id, manageCourseMemberDto) {
        return this.coursesService.addStudent(id, manageCourseMemberDto);
    }
    removeStudent(id, userId) {
        return this.coursesService.removeStudent(id, userId);
    }
    createQuiz(courseId, dto) {
        const payload = { ...dto, courseId };
        return this.quizzesService.create(payload);
    }
    listQuizzes(courseId) {
        return this.quizzesService.findByCourse(courseId);
    }
    createDocument(courseId, dto, file, req) {
        const user = req.user;
        const payload = { ...dto, courseId };
        return this.documentsService.create(payload, file, user.userId);
    }
    createAssignment(courseId, dto) {
        const payload = { ...dto, courseId };
        return this.assignmentsService.create(payload);
    }
    createChatMessage(courseId, dto, req) {
        const user = req.user;
        return this.chatService.createMessage(courseId, user.userId, dto.content);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kurs oluştur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Paginated course list' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiOperation)({ summary: 'Kursları listele (sayfalı)' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Kurs detayını getir' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kursu güncelle (chatPolicy dahil)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kursu sil' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/teachers'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manage_course_member_dto_1.ManageCourseMemberDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Delete)(':id/teachers/:userId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "removeTeacher", null);
__decorate([
    (0, common_1.Post)(':id/students'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manage_course_member_dto_1.ManageCourseMemberDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Delete)(':id/students/:userId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Post)(':id/quizzes'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kursa quiz oluştur' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Get)(':id/quizzes'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher, roles_enum_1.Role.Student),
    (0, swagger_1.ApiOperation)({ summary: 'Kursun quizlerini getir' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "listQuizzes", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kursa doküman yükle (S3, opsiyonel öğrenci hedefleme)' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: multer_1.default.memoryStorage() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Post)(':id/assignments'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Kursa ödev oluştur (hedef atama yapılabilir)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Post)(':id/chat'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher, roles_enum_1.Role.Student),
    (0, swagger_1.ApiOperation)({ summary: 'Kurs feed mesajı gönder (ChatPolicy uygulanır)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createChatMessage", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('Courses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [courses_service_1.CoursesService,
        quizzes_service_1.QuizzesService,
        documents_service_1.DocumentsService,
        assignments_service_1.AssignmentsService,
        chat_service_1.ChatService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map
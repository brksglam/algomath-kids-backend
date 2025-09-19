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
exports.SchedulingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const scheduling_service_1 = require("./scheduling.service");
class UpsertAvailabilityDto {
    weeklySlots;
}
class CreateLessonDto {
    teacherId;
    studentId;
    courseId;
    startAt;
    endAt;
}
let SchedulingController = class SchedulingController {
    schedulingService;
    constructor(schedulingService) {
        this.schedulingService = schedulingService;
    }
    upsertAvailability(teacherId, dto) {
        return this.schedulingService.upsertAvailability(teacherId, dto.weeklySlots);
    }
    getAvailability(teacherId) {
        return this.schedulingService.getAvailability(teacherId);
    }
    createLesson(dto) {
        return this.schedulingService.createLesson(dto.teacherId, dto.studentId, dto.courseId, new Date(dto.startAt), new Date(dto.endAt));
    }
    listByTeacher(teacherId) {
        return this.schedulingService.listLessonsByTeacher(teacherId);
    }
    listByStudent(studentId) {
        return this.schedulingService.listLessonsByStudent(studentId);
    }
};
exports.SchedulingController = SchedulingController;
__decorate([
    (0, common_1.Post)('availability/:teacherId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Admin - Öğretmen uygunluk saatlerini ayarla' }),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpsertAvailabilityDto]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "upsertAvailability", null);
__decorate([
    (0, common_1.Get)('availability/:teacherId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Admin/Teacher - Öğretmen uygunluk saatlerini getir' }),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Post)('lessons'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Admin/Teacher - Ders randevusu oluştur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLessonDto]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Get)('lessons/teacher/:teacherId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher),
    (0, swagger_1.ApiOperation)({ summary: 'Admin/Teacher - Öğretmenin randevularını listele' }),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "listByTeacher", null);
__decorate([
    (0, common_1.Get)('lessons/student/:studentId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher, roles_enum_1.Role.Student),
    (0, swagger_1.ApiOperation)({ summary: 'Admin/Teacher/Student - Öğrencinin randevularını listele' }),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulingController.prototype, "listByStudent", null);
exports.SchedulingController = SchedulingController = __decorate([
    (0, swagger_1.ApiTags)('Scheduling'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('scheduling'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [scheduling_service_1.SchedulingService])
], SchedulingController);
//# sourceMappingURL=scheduling.controller.js.map
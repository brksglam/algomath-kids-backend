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
exports.SchedulingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const availability_schema_1 = require("./schemas/availability.schema");
const lesson_schema_1 = require("./schemas/lesson.schema");
let SchedulingService = class SchedulingService {
    availabilityModel;
    lessonModel;
    constructor(availabilityModel, lessonModel) {
        this.availabilityModel = availabilityModel;
        this.lessonModel = lessonModel;
    }
    async upsertAvailability(teacherId, weeklySlots) {
        return this.availabilityModel
            .findOneAndUpdate({ teacher: new mongoose_2.Types.ObjectId(teacherId) }, { $set: { weeklySlots }, $setOnInsert: { teacher: new mongoose_2.Types.ObjectId(teacherId) } }, { new: true, upsert: true })
            .lean()
            .exec();
    }
    async getAvailability(teacherId) {
        const av = await this.availabilityModel.findOne({ teacher: teacherId }).lean().exec();
        if (!av)
            throw new common_1.NotFoundException('Availability not found');
        return av;
    }
    async createLesson(teacherId, studentId, courseId, startAt, endAt) {
        if (endAt <= startAt)
            throw new common_1.BadRequestException('endAt must be after startAt');
        const teacherConflict = await this.lessonModel.exists({
            teacher: teacherId,
            startAt: { $lt: endAt },
            endAt: { $gt: startAt },
        });
        if (teacherConflict)
            throw new common_1.BadRequestException('Teacher has a conflicting lesson');
        const studentConflict = await this.lessonModel.exists({
            student: studentId,
            startAt: { $lt: endAt },
            endAt: { $gt: startAt },
        });
        if (studentConflict)
            throw new common_1.BadRequestException('Student has a conflicting lesson');
        const lesson = await this.lessonModel.create({
            teacher: new mongoose_2.Types.ObjectId(teacherId),
            student: new mongoose_2.Types.ObjectId(studentId),
            course: new mongoose_2.Types.ObjectId(courseId),
            startAt,
            endAt,
        });
        return lesson.toObject();
    }
    async listLessonsByTeacher(teacherId) {
        return this.lessonModel.find({ teacher: teacherId }).lean().exec();
    }
    async listLessonsByStudent(studentId) {
        return this.lessonModel.find({ student: studentId }).lean().exec();
    }
};
exports.SchedulingService = SchedulingService;
exports.SchedulingService = SchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(availability_schema_1.Availability.name)),
    __param(1, (0, mongoose_1.InjectModel)(lesson_schema_1.Lesson.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SchedulingService);
//# sourceMappingURL=scheduling.service.js.map
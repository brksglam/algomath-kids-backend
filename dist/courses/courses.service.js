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
const course_schema_1 = require("./schemas/course.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let CoursesService = class CoursesService {
    courseModel;
    userModel;
    constructor(courseModel, userModel) {
        this.courseModel = courseModel;
        this.userModel = userModel;
    }
    async create(createCourseDto) {
        const course = new this.courseModel({
            ...createCourseDto,
            teachers: this.mapToObjectIds(createCourseDto.teachers),
            students: this.mapToObjectIds(createCourseDto.students),
        });
        const savedCourse = await course.save();
        await this.addCourseReference([...savedCourse.teachers, ...savedCourse.students], savedCourse._id);
        return savedCourse.toObject();
    }
    async findAll() {
        return this.courseModel.find().lean().exec();
    }
    async findOne(id) {
        const course = await this.courseModel.findById(id).lean().exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return course;
    }
    async findOneWithRelations(id) {
        const course = await this.courseModel
            .findById(id)
            .populate('teachers', '-password')
            .populate('students', '-password')
            .populate('documents')
            .populate('assignments')
            .populate('quizzes')
            .populate('chats')
            .lean()
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const update = { ...updateCourseDto };
        if (updateCourseDto.teachers) {
            update.teachers = this.mapToObjectIds(updateCourseDto.teachers);
        }
        if (updateCourseDto.students) {
            update.students = this.mapToObjectIds(updateCourseDto.students);
        }
        if (updateCourseDto.documents) {
            update.documents = this.mapToObjectIds(updateCourseDto.documents);
        }
        if (updateCourseDto.assignments) {
            update.assignments = this.mapToObjectIds(updateCourseDto.assignments);
        }
        if (updateCourseDto.quizzes) {
            update.quizzes = this.mapToObjectIds(updateCourseDto.quizzes);
        }
        if (updateCourseDto.chats) {
            update.chats = this.mapToObjectIds(updateCourseDto.chats);
        }
        const course = await this.courseModel
            .findByIdAndUpdate(id, update, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.refreshCourseReferences(course);
        return course.toObject();
    }
    async remove(id) {
        const course = await this.courseModel.findByIdAndDelete(id).exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.removeCourseReference(course._id);
    }
    async addTeacher(courseId, manageCourseMemberDto) {
        await this.ensureUserExists(manageCourseMemberDto.userId);
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $addToSet: { teachers: new mongoose_2.Types.ObjectId(manageCourseMemberDto.userId) } }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.addCourseReference([new mongoose_2.Types.ObjectId(manageCourseMemberDto.userId)], course._id);
        return course.toObject();
    }
    async removeTeacher(courseId, userId) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $pull: { teachers: new mongoose_2.Types.ObjectId(userId) } }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.userModel.updateOne({ _id: userId }, { $pull: { courses: course._id } }).exec();
        return course.toObject();
    }
    async addStudent(courseId, manageCourseMemberDto) {
        await this.ensureUserExists(manageCourseMemberDto.userId);
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $addToSet: { students: new mongoose_2.Types.ObjectId(manageCourseMemberDto.userId) } }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.addCourseReference([new mongoose_2.Types.ObjectId(manageCourseMemberDto.userId)], course._id);
        return course.toObject();
    }
    async removeStudent(courseId, userId) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $pull: { students: new mongoose_2.Types.ObjectId(userId) } }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.userModel.updateOne({ _id: userId }, { $pull: { courses: course._id } }).exec();
        return course.toObject();
    }
    mapToObjectIds(values) {
        return values?.map((value) => new mongoose_2.Types.ObjectId(value)) ?? [];
    }
    async ensureUserExists(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async addCourseReference(userIds, courseId) {
        if (userIds.length === 0) {
            return;
        }
        await this.userModel
            .updateMany({ _id: { $in: userIds } }, { $addToSet: { courses: courseId } })
            .exec();
    }
    async refreshCourseReferences(course) {
        await this.removeCourseReference(course._id);
        await this.addCourseReference([...course.teachers, ...course.students], course._id);
    }
    async removeCourseReference(courseId) {
        await this.userModel.updateMany({ courses: courseId }, { $pull: { courses: courseId } }).exec();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map
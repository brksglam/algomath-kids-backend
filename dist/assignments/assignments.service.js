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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const storage_service_1 = require("../storage/storage.service");
const assignment_schema_1 = require("./schemas/assignment.schema");
const course_schema_1 = require("../courses/schemas/course.schema");
let AssignmentsService = class AssignmentsService {
    assignmentModel;
    courseModel;
    storageService;
    constructor(assignmentModel, courseModel, storageService) {
        this.assignmentModel = assignmentModel;
        this.courseModel = courseModel;
        this.storageService = storageService;
    }
    async create(createAssignmentDto) {
        const course = await this.courseModel
            .findById(createAssignmentDto.courseId)
            .exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const assignment = await this.assignmentModel.create({
            course: course._id,
            title: createAssignmentDto.title,
            description: createAssignmentDto.description,
            deadline: createAssignmentDto.deadline
                ? new Date(createAssignmentDto.deadline)
                : undefined,
            assignedTo: createAssignmentDto.assignedTo?.map((id) => new mongoose_2.Types.ObjectId(id)) ??
                [],
            recipients: createAssignmentDto.recipients?.map((id) => new mongoose_2.Types.ObjectId(id)) ??
                [],
        });
        await this.courseModel
            .findByIdAndUpdate(course._id, {
            $addToSet: { assignments: assignment._id },
        })
            .exec();
        return assignment.toObject();
    }
    async findByCourse(courseId) {
        return this.assignmentModel.find({ course: courseId }).lean().exec();
    }
    async findByCoursePaginated(courseId, page, limit) {
        const [items, total] = await Promise.all([
            this.assignmentModel
                .find({ course: courseId })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .exec(),
            this.assignmentModel.countDocuments({ course: courseId }).exec(),
        ]);
        return { items, total, page, limit };
    }
    async update(id, updateAssignmentDto) {
        const update = { ...updateAssignmentDto };
        if (updateAssignmentDto.deadline) {
            update.deadline = new Date(updateAssignmentDto.deadline);
        }
        if (updateAssignmentDto.assignedTo) {
            update.assignedTo = updateAssignmentDto.assignedTo.map((studentId) => new mongoose_2.Types.ObjectId(studentId));
        }
        const assignment = await this.assignmentModel
            .findByIdAndUpdate(id, { $set: update }, { new: true })
            .lean()
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        return assignment;
    }
    async assignStudents(id, assignStudentsDto) {
        const assignment = await this.assignmentModel
            .findByIdAndUpdate(id, {
            $set: {
                assignedTo: assignStudentsDto.studentIds.map((studentId) => new mongoose_2.Types.ObjectId(studentId)),
            },
        }, { new: true })
            .lean()
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        return assignment;
    }
    async submit(id, studentId, file) {
        if (!file) {
            throw new common_1.BadRequestException('Submission file is required');
        }
        const assignment = await this.assignmentModel.findById(id).exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        const studentObjectId = new mongoose_2.Types.ObjectId(studentId);
        const isAssigned = assignment.assignedTo.length === 0 ||
            assignment.assignedTo.some((assigned) => assigned.equals(studentObjectId));
        if (!isAssigned) {
            throw new common_1.ForbiddenException('You are not assigned to this assignment');
        }
        const uploadPath = 'courses/' +
            assignment.course.toString() +
            '/assignments/' +
            assignment.id +
            '/submissions';
        const url = await this.storageService.upload(file, uploadPath);
        assignment.submissions.push({
            student: studentObjectId,
            url,
            submittedAt: new Date(),
        });
        await assignment.save();
        return assignment.toObject();
    }
    async remove(id) {
        const assignment = await this.assignmentModel.findByIdAndDelete(id).exec();
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        await this.courseModel
            .findByIdAndUpdate(assignment.course, {
            $pull: { assignments: assignment._id },
        })
            .exec();
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assignment_schema_1.Assignment.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        storage_service_1.StorageService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentSchema = exports.Assignment = exports.AssignmentSubmission = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AssignmentSubmission = class AssignmentSubmission {
    student;
    url;
    submittedAt;
};
exports.AssignmentSubmission = AssignmentSubmission;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AssignmentSubmission.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], AssignmentSubmission.prototype, "submittedAt", void 0);
exports.AssignmentSubmission = AssignmentSubmission = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], AssignmentSubmission);
const AssignmentSubmissionSchema = mongoose_1.SchemaFactory.createForClass(AssignmentSubmission);
let Assignment = class Assignment {
    course;
    title;
    description;
    deadline;
    assignedTo;
    recipients;
    submissions;
};
exports.Assignment = Assignment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Assignment.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Assignment.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Assignment.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Assignment.prototype, "assignedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Assignment.prototype, "recipients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [AssignmentSubmissionSchema], default: [] }),
    __metadata("design:type", Array)
], Assignment.prototype, "submissions", void 0);
exports.Assignment = Assignment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Assignment);
exports.AssignmentSchema = mongoose_1.SchemaFactory.createForClass(Assignment);
//# sourceMappingURL=assignment.schema.js.map
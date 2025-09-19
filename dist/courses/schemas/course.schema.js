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
exports.CourseSchema = exports.Course = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_policy_enum_1 = require("../../common/enums/chat-policy.enum");
let Course = class Course {
    title;
    description;
    teachers;
    students;
    documents;
    assignments;
    quizzes;
    chats;
    chatPolicy;
};
exports.Course = Course;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "teachers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "students", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Document' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Assignment' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "assignments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Quiz' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "quizzes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'ChatMessage' }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "chats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: chat_policy_enum_1.ChatPolicy, default: chat_policy_enum_1.ChatPolicy.StudentsWithTeacher }),
    __metadata("design:type", String)
], Course.prototype, "chatPolicy", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Course);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
//# sourceMappingURL=course.schema.js.map
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
exports.CourseSchema = exports.Course = exports.ChatMessageSchema = exports.ChatMessage = exports.AssignmentSchema = exports.Assignment = exports.CourseDocumentEntrySchema = exports.CourseDocumentEntry = exports.QuizSchema = exports.Quiz = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
let Quiz = class Quiz {
    title;
    description;
    createdAt;
};
exports.Quiz = Quiz;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
exports.Quiz = Quiz = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Quiz);
exports.QuizSchema = mongoose_1.SchemaFactory.createForClass(Quiz);
let CourseDocumentEntry = class CourseDocumentEntry {
    name;
    url;
    description;
    uploadedAt;
};
exports.CourseDocumentEntry = CourseDocumentEntry;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseDocumentEntry.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseDocumentEntry.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CourseDocumentEntry.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], CourseDocumentEntry.prototype, "uploadedAt", void 0);
exports.CourseDocumentEntry = CourseDocumentEntry = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CourseDocumentEntry);
exports.CourseDocumentEntrySchema = mongoose_1.SchemaFactory.createForClass(CourseDocumentEntry);
let Assignment = class Assignment {
    title;
    description;
    dueDate;
    assignedAt;
};
exports.Assignment = Assignment;
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
], Assignment.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Assignment.prototype, "assignedAt", void 0);
exports.Assignment = Assignment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Assignment);
exports.AssignmentSchema = mongoose_1.SchemaFactory.createForClass(Assignment);
let ChatMessage = class ChatMessage {
    sender;
    message;
    sentAt;
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: user_schema_1.User.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChatMessage.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], ChatMessage.prototype, "sentAt", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ChatMessage);
exports.ChatMessageSchema = mongoose_1.SchemaFactory.createForClass(ChatMessage);
let Course = class Course {
    title;
    description;
    teachers;
    quizzes;
    documents;
    assignments;
    chatMessages;
};
exports.Course = Course;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: user_schema_1.User.name }], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "teachers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.QuizSchema], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "quizzes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.CourseDocumentEntrySchema], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.AssignmentSchema], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "assignments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ChatMessageSchema], default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "chatMessages", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Course);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
//# sourceMappingURL=course.schema.js.map
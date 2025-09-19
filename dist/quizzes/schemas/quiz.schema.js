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
exports.QuizSchema = exports.Quiz = exports.QuizQuestion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuizQuestion = class QuizQuestion {
    text;
    options;
    correctAnswer;
};
exports.QuizQuestion = QuizQuestion;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], QuizQuestion.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "correctAnswer", void 0);
exports.QuizQuestion = QuizQuestion = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], QuizQuestion);
const QuizQuestionSchema = mongoose_1.SchemaFactory.createForClass(QuizQuestion);
let Quiz = class Quiz {
    course;
    title;
    description;
    questions;
};
exports.Quiz = Quiz;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Quiz.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [QuizQuestionSchema], default: [] }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
exports.Quiz = Quiz = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Quiz);
exports.QuizSchema = mongoose_1.SchemaFactory.createForClass(Quiz);
//# sourceMappingURL=quiz.schema.js.map
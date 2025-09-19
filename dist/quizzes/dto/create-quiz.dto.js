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
exports.CreateQuizDto = exports.CreateQuizQuestionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateQuizQuestionDto {
    text;
    options;
    correctAnswer;
}
exports.CreateQuizQuestionDto = CreateQuizQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2+2 kaç eder?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizQuestionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ['3', '4', '5'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    __metadata("design:type", Array)
], CreateQuizQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizQuestionDto.prototype, "correctAnswer", void 0);
class CreateQuizDto {
    courseId;
    title;
    description;
    questions;
}
exports.CreateQuizDto = CreateQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '66ed2a3f4f5e9b1234567890' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toplama İşlemleri' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Basit toplama soruları' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateQuizQuestionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateQuizQuestionDto),
    __metadata("design:type", Array)
], CreateQuizDto.prototype, "questions", void 0);
//# sourceMappingURL=create-quiz.dto.js.map
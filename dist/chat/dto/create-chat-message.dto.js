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
exports.CreateChatMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateChatMessageDto {
    courseId;
    content;
    recipientId;
}
exports.CreateChatMessageDto = CreateChatMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '66ed2a3f4f5e9b1234567890' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Merhaba sınıf!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'DM için hedef kullanıcı' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "recipientId", void 0);
//# sourceMappingURL=create-chat-message.dto.js.map
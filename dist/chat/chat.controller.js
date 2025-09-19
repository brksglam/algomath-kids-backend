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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const chat_service_1 = require("./chat.service");
const create_chat_message_dto_1 = require("./dto/create-chat-message.dto");
const swagger_1 = require("@nestjs/swagger");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    create(createChatMessageDto, req) {
        const user = req.user;
        return this.chatService.createMessage(createChatMessageDto.courseId, user.userId, createChatMessageDto.content, createChatMessageDto.recipientId);
    }
    findByCourse(courseId, page = 1, limit = 20) {
        return this.chatService.findByCourse(courseId, +page, +limit);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher, roles_enum_1.Role.Student),
    (0, swagger_1.ApiOperation)({ summary: 'Kurs feed mesajı veya DM gönder (recipientId varsa DM)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_message_dto_1.CreateChatMessageDto, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Teacher, roles_enum_1.Role.Student),
    (0, swagger_1.ApiOperation)({ summary: 'Kurs feed mesajlarını getir' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findByCourse", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map
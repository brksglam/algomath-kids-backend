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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_message_schema_1 = require("./schemas/chat-message.schema");
const course_schema_1 = require("../courses/schemas/course.schema");
let ChatService = class ChatService {
    chatModel;
    courseModel;
    constructor(chatModel, courseModel) {
        this.chatModel = chatModel;
        this.courseModel = courseModel;
    }
    async createMessage(courseId, senderId, content) {
        const course = await this.courseModel.findById(courseId).exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const message = await this.chatModel.create({
            course: course._id,
            sender: new mongoose_2.Types.ObjectId(senderId),
            content,
            createdAt: new Date(),
        });
        await this.courseModel
            .findByIdAndUpdate(course._id, { $addToSet: { chats: message._id } })
            .exec();
        return message.toObject();
    }
    async findByCourse(courseId) {
        return this.chatModel
            .find({ course: courseId })
            .sort({ createdAt: 1 })
            .lean()
            .exec();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_message_schema_1.ChatMessage.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map
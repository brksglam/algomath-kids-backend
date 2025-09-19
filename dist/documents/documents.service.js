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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const storage_service_1 = require("../storage/storage.service");
const messaging_service_1 = require("../messaging/messaging.service");
const document_schema_1 = require("./schemas/document.schema");
const course_schema_1 = require("../courses/schemas/course.schema");
let DocumentsService = class DocumentsService {
    documentModel;
    courseModel;
    storageService;
    messagingService;
    constructor(documentModel, courseModel, storageService, messagingService) {
        this.documentModel = documentModel;
        this.courseModel = courseModel;
        this.storageService = storageService;
        this.messagingService = messagingService;
    }
    async create(createDocumentDto, file, uploadedBy) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const course = await this.courseModel.findById(createDocumentDto.courseId).exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const uploadPath = 'courses/' + course.id + '/documents';
        const url = await this.storageService.upload(file, uploadPath);
        const document = await this.documentModel.create({
            course: course._id,
            title: createDocumentDto.title ?? file.originalname,
            description: createDocumentDto.description,
            url,
            uploadedBy: new mongoose_2.Types.ObjectId(uploadedBy),
            recipients: createDocumentDto.recipients?.map((id) => new mongoose_2.Types.ObjectId(id)) ?? [],
        });
        await this.courseModel
            .findByIdAndUpdate(course._id, { $addToSet: { documents: document._id } })
            .exec();
        await this.messagingService.publish('document.created', {
            documentId: document.id,
            courseId: course.id,
            title: document.title,
        });
        return document.toObject();
    }
    async findByCourse(courseId) {
        return this.documentModel.find({ course: courseId }).lean().exec();
    }
    async findByCoursePaginated(courseId, page, limit) {
        const [items, total] = await Promise.all([
            this.documentModel
                .find({ course: courseId })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .exec(),
            this.documentModel.countDocuments({ course: courseId }).exec(),
        ]);
        return { items, total, page, limit };
    }
    async update(id, updateDocumentDto) {
        const document = await this.documentModel
            .findByIdAndUpdate(id, { $set: updateDocumentDto }, { new: true })
            .lean()
            .exec();
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        return document;
    }
    async remove(id) {
        const document = await this.documentModel.findByIdAndDelete(id).exec();
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        await this.courseModel
            .findByIdAndUpdate(document.course, { $pull: { documents: document._id } })
            .exec();
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(document_schema_1.DocumentEntity.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        storage_service_1.StorageService,
        messaging_service_1.MessagingService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map
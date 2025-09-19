"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const storage_module_1 = require("../storage/storage.module");
const messaging_module_1 = require("../messaging/messaging.module");
const documents_controller_1 = require("./documents.controller");
const documents_service_1 = require("./documents.service");
const document_schema_1 = require("./schemas/document.schema");
const course_schema_1 = require("../courses/schemas/course.schema");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            storage_module_1.StorageModule,
            messaging_module_1.MessagingModule,
            mongoose_1.MongooseModule.forFeature([
                { name: document_schema_1.DocumentEntity.name, schema: document_schema_1.DocumentSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
            ]),
        ],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService],
        exports: [documents_service_1.DocumentsService],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
const course_schema_1 = require("./schemas/course.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const quizzes_module_1 = require("../quizzes/quizzes.module");
const documents_module_1 = require("../documents/documents.module");
const assignments_module_1 = require("../assignments/assignments.module");
const chat_module_1 = require("../chat/chat.module");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            quizzes_module_1.QuizzesModule,
            documents_module_1.DocumentsModule,
            assignments_module_1.AssignmentsModule,
            chat_module_1.ChatModule,
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map
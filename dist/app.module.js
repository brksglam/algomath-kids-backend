"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const courses_module_1 = require("./courses/courses.module");
const documents_module_1 = require("./documents/documents.module");
const assignments_module_1 = require("./assignments/assignments.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const chat_module_1 = require("./chat/chat.module");
const storage_module_1 = require("./storage/storage.module");
const redis_module_1 = require("./redis/redis.module");
const messaging_module_1 = require("./messaging/messaging.module");
const mailer_1 = require("@nestjs-modules/mailer");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const logger = new common_1.Logger('AppModule');
const dbEnabled = process.env.MONGO_DISABLED !== 'true';
const mongooseImports = dbEnabled
    ? [
        mongoose_1.MongooseModule.forRootAsync({
            imports: [config_1.ConfigModule],
            inject: [config_1.ConfigService],
            useFactory: async (configService) => {
                const uri = configService.get('MONGO_URI');
                const options = {};
                if (!uri) {
                    logger.error('MONGO_URI is not defined. MongoDB connection will be skipped.');
                    const mongooseInstance = new mongoose_2.default.Mongoose();
                    options.connectionFactory = () => mongooseInstance.createConnection();
                }
                else {
                    options.uri = uri;
                }
                return options;
            },
        }),
    ]
    : [];
const dbModules = dbEnabled
    ? [users_module_1.UsersModule, auth_module_1.AuthModule, courses_module_1.CoursesModule, documents_module_1.DocumentsModule, assignments_module_1.AssignmentsModule, quizzes_module_1.QuizzesModule, chat_module_1.ChatModule]
    : [];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST'),
                        port: Number(configService.get('MAIL_PORT') ?? 587),
                        secure: configService.get('MAIL_SECURE', 'false') === 'true',
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASS'),
                        },
                    },
                    defaults: {
                        from: configService.get('MAIL_FROM', 'no-reply@example.com'),
                    },
                }),
            }),
            ...mongooseImports,
            storage_module_1.StorageModule,
            redis_module_1.RedisModule,
            messaging_module_1.MessagingModule,
            ...dbModules,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
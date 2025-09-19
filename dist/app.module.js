"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const courses_module_1 = require("./courses/courses.module");
const messaging_module_1 = require("./messaging/messaging.module");
const redis_module_1 = require("./redis/redis.module");
const storage_module_1 = require("./storage/storage.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI', 'mongodb://localhost:27017/algomath'),
                }),
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const transport = {
                        host: configService.get('MAIL_HOST', 'localhost'),
                        port: configService.get('MAIL_PORT', 587),
                        secure: configService.get('MAIL_SECURE', 'false') === 'true',
                    };
                    const user = configService.get('MAIL_USER');
                    const pass = configService.get('MAIL_PASSWORD');
                    if (user && pass) {
                        transport['auth'] = { user, pass };
                    }
                    return {
                        transport,
                        defaults: {
                            from: configService.get('MAIL_DEFAULT_FROM', 'Algomath Kids <no-reply@algomath.com>'),
                        },
                    };
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            storage_module_1.StorageModule,
            messaging_module_1.MessagingModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
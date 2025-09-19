import { Module, Logger } from '@nestjs/common';
import { config as loadEnv } from 'dotenv';
loadEnv();

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { DocumentsModule } from './documents/documents.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ChatModule } from './chat/chat.module';
import { StorageModule } from './storage/storage.module';
import { RedisModule } from './redis/redis.module';
import { MessagingModule } from './messaging/messaging.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { SchedulingModule } from './scheduling/scheduling.module';

const logger = new Logger('AppModule');

const dbEnabled = process.env.MONGO_DISABLED !== 'true';
const mongooseImports = dbEnabled
  ? [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const uri = configService.get<string>('MONGO_URI');
          const options: MongooseModuleOptions = {};
          if (!uri) {
            logger.error('MONGO_URI is not defined. MongoDB connection will be skipped.');
            const mongooseInstance = new mongoose.Mongoose();
            options.connectionFactory = () => mongooseInstance.createConnection();
          } else {
            options.uri = uri;
          }
          return options;
        },
      }),
    ]
  : [];

const dbModules = dbEnabled
  ? [UsersModule, AuthModule, CoursesModule, DocumentsModule, AssignmentsModule, QuizzesModule, ChatModule]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST') || configService.get<string>('SMTP_HOST'),
          port: Number(configService.get<string>('MAIL_PORT') || configService.get<string>('SMTP_PORT') || 587),
          secure: (configService.get<string>('MAIL_SECURE') || 'false') === 'true',
          auth: {
            user: configService.get<string>('MAIL_USER') || configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('MAIL_PASS') || configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM') || configService.get<string>('CONTACT_EMAIL') || 'no-reply@example.com',
        },
      }),
    }),
    ...mongooseImports,
    StorageModule,
    RedisModule,
    MessagingModule,
    ...dbModules,
    ProfilesModule,
    SchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

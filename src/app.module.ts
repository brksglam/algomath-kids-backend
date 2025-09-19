import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { MessagingModule } from './messaging/messaging.module';
import { RedisModule } from './redis/redis.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/algomath'),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const transport: Record<string, unknown> = {
          host: configService.get<string>('MAIL_HOST', 'localhost'),
          port: configService.get<number>('MAIL_PORT', 587),
          secure: configService.get<string>('MAIL_SECURE', 'false') === 'true',
        };

        const user = configService.get<string>('MAIL_USER');
        const pass = configService.get<string>('MAIL_PASSWORD');
        if (user && pass) {
          transport['auth'] = { user, pass };
        }

        return {
          transport,
          defaults: {
            from: configService.get<string>('MAIL_DEFAULT_FROM', 'Algomath Kids <no-reply@algomath.com>'),
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    StorageModule,
    MessagingModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

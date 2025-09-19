import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    MessagingModule,
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}

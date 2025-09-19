import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './schemas/course.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { DocumentsModule } from '../documents/documents.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    QuizzesModule,
    DocumentsModule,
    AssignmentsModule,
    ChatModule,
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

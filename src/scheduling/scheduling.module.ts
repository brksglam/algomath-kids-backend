import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';
import {
  Availability,
  AvailabilitySchema,
} from './schemas/availability.schema';
import { Lesson, LessonSchema } from './schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [SchedulingService],
})
export class SchedulingModule {}

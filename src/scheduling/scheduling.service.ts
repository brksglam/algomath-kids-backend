import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Availability,
  AvailabilityDocument,
} from './schemas/availability.schema';
import { Lesson, LessonDocument } from './schemas/lesson.schema';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  async upsertAvailability(teacherId: string, weeklySlots: string[]) {
    return this.availabilityModel
      .findOneAndUpdate(
        { teacher: new Types.ObjectId(teacherId) },
        {
          $set: { weeklySlots },
          $setOnInsert: { teacher: new Types.ObjectId(teacherId) },
        },
        { new: true, upsert: true },
      )
      .lean()
      .exec();
  }

  async getAvailability(teacherId: string) {
    const av = await this.availabilityModel
      .findOne({ teacher: teacherId })
      .lean()
      .exec();
    if (!av) throw new NotFoundException('Availability not found');
    return av;
  }

  async createLesson(
    teacherId: string,
    studentId: string,
    courseId: string,
    startAt: Date,
    endAt: Date,
  ) {
    if (endAt <= startAt)
      throw new BadRequestException('endAt must be after startAt');
    // conflict: teacher overlap
    const teacherConflict = await this.lessonModel.exists({
      teacher: teacherId,
      startAt: { $lt: endAt },
      endAt: { $gt: startAt },
    });
    if (teacherConflict)
      throw new BadRequestException('Teacher has a conflicting lesson');

    // conflict: student overlap
    const studentConflict = await this.lessonModel.exists({
      student: studentId,
      startAt: { $lt: endAt },
      endAt: { $gt: startAt },
    });
    if (studentConflict)
      throw new BadRequestException('Student has a conflicting lesson');
    const lesson = await this.lessonModel.create({
      teacher: new Types.ObjectId(teacherId),
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      startAt,
      endAt,
    });
    return lesson.toObject();
  }

  async listLessonsByTeacher(teacherId: string) {
    return this.lessonModel.find({ teacher: teacherId }).lean().exec();
  }

  async listLessonsByStudent(studentId: string) {
    return this.lessonModel.find({ student: studentId }).lean().exec();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ManageCourseMemberDto } from './dto/manage-course-member.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = new this.courseModel({
      ...createCourseDto,
      teachers: this.mapToObjectIds(createCourseDto.teachers),
      students: this.mapToObjectIds(createCourseDto.students),
    });

    const savedCourse = await course.save();
    await this.addCourseReference([...savedCourse.teachers, ...savedCourse.students], savedCourse._id);
    return savedCourse.toObject();
  }

  async findAll() {
    return this.courseModel.find().lean().exec();
  }

  async findAllPaginated(page: number, limit: number): Promise<{ items: unknown[]; total: number }> {
    const [items, total] = await Promise.all([
      this.courseModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.courseModel.countDocuments().exec(),
    ]);
    return { items, total };
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).lean().exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async findOneWithRelations(id: string) {
    const course = await this.courseModel
      .findById(id)
      .populate('teachers', '-password')
      .populate('students', '-password')
      .populate('documents')
      .populate('assignments')
      .populate('quizzes')
      .populate('chats')
      .lean()
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const update: Record<string, unknown> = { ...updateCourseDto };

    if (updateCourseDto.teachers) {
      update.teachers = this.mapToObjectIds(updateCourseDto.teachers);
    }

    if (updateCourseDto.students) {
      update.students = this.mapToObjectIds(updateCourseDto.students);
    }

    if (updateCourseDto.documents) {
      update.documents = this.mapToObjectIds(updateCourseDto.documents);
    }

    if (updateCourseDto.assignments) {
      update.assignments = this.mapToObjectIds(updateCourseDto.assignments);
    }

    if (updateCourseDto.quizzes) {
      update.quizzes = this.mapToObjectIds(updateCourseDto.quizzes);
    }

    if (updateCourseDto.chats) {
      update.chats = this.mapToObjectIds(updateCourseDto.chats);
    }

    const course = await this.courseModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.refreshCourseReferences(course);
    return course.toObject();
  }

  async remove(id: string) {
    const course = await this.courseModel.findByIdAndDelete(id).exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.removeCourseReference(course._id);
  }

  async addTeacher(courseId: string, manageCourseMemberDto: ManageCourseMemberDto) {
    await this.ensureUserExists(manageCourseMemberDto.userId);

    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $addToSet: { teachers: new Types.ObjectId(manageCourseMemberDto.userId) } },
        { new: true },
      )
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.addCourseReference([new Types.ObjectId(manageCourseMemberDto.userId)], course._id);
    return course.toObject();
  }

  async removeTeacher(courseId: string, userId: string) {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $pull: { teachers: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.userModel.updateOne({ _id: userId }, { $pull: { courses: course._id } }).exec();
    return course.toObject();
  }

  async addStudent(courseId: string, manageCourseMemberDto: ManageCourseMemberDto) {
    await this.ensureUserExists(manageCourseMemberDto.userId);

    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $addToSet: { students: new Types.ObjectId(manageCourseMemberDto.userId) } },
        { new: true },
      )
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.addCourseReference([new Types.ObjectId(manageCourseMemberDto.userId)], course._id);
    return course.toObject();
  }

  async removeStudent(courseId: string, userId: string) {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $pull: { students: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.userModel.updateOne({ _id: userId }, { $pull: { courses: course._id } }).exec();
    return course.toObject();
  }

  private mapToObjectIds(values?: string[]) {
    return values?.map((value) => new Types.ObjectId(value)) ?? [];
  }

  private async ensureUserExists(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async addCourseReference(userIds: Types.ObjectId[], courseId: Types.ObjectId) {
    if (userIds.length === 0) {
      return;
    }

    await this.userModel
      .updateMany({ _id: { $in: userIds } }, { $addToSet: { courses: courseId } })
      .exec();
  }

  private async refreshCourseReferences(course: CourseDocument) {
    await this.removeCourseReference(course._id);
    await this.addCourseReference([...course.teachers, ...course.students], course._id);
  }

  private async removeCourseReference(courseId: Types.ObjectId) {
    await this.userModel.updateMany({ courses: courseId }, { $pull: { courses: courseId } }).exec();
  }
}

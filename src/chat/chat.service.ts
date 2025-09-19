import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { ChatPolicy } from '../common/enums/chat-policy.enum';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private readonly chatModel: Model<ChatMessageDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  async createMessage(courseId: string, senderId: string, content: string, recipientId?: string) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Permission: sender must be a teacher or student of the course
    const isTeacher = course.teachers.some((t) => t.equals(new Types.ObjectId(senderId)));
    const isStudent = course.students.some((s) => s.equals(new Types.ObjectId(senderId)));
    if (!isTeacher && !isStudent) {
      throw new NotFoundException('You are not a member of this course');
    }

    // Enforce chat policy
    const policy = (course as unknown as { chatPolicy?: ChatPolicy }).chatPolicy ?? ChatPolicy.StudentsWithTeacher;
    if (policy === ChatPolicy.TeacherToStudents && !isTeacher) {
      throw new NotFoundException('Only teachers can send messages in this course');
    }

    const message = await this.chatModel.create({
      course: course._id,
      sender: new Types.ObjectId(senderId),
      recipient: recipientId ? new Types.ObjectId(recipientId) : undefined,
      content,
      createdAt: new Date(),
    });

    await this.courseModel
      .findByIdAndUpdate(course._id, { $addToSet: { chats: message._id } })
      .exec();

    return message.toObject();
  }

  async findByCourse(courseId: string, page = 1, limit = 20) {
    return this.chatModel
      .find({ course: courseId })
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private readonly chatModel: Model<ChatMessageDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  async createMessage(courseId: string, senderId: string, content: string) {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const message = await this.chatModel.create({
      course: course._id,
      sender: new Types.ObjectId(senderId),
      content,
      createdAt: new Date(),
    });

    await this.courseModel
      .findByIdAndUpdate(course._id, { $addToSet: { chats: message._id } })
      .exec();

    return message.toObject();
  }

  async findByCourse(courseId: string) {
    return this.chatModel
      .find({ course: courseId })
      .sort({ createdAt: 1 })
      .lean()
      .exec();
  }
}

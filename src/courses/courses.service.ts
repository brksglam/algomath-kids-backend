import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import type { Express } from 'express';
import { MessagingService } from '../messaging/messaging.service';
import { StorageService } from '../storage/storage.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ManageTeacherDto } from './dto/manage-teacher.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    private readonly storageService: StorageService,
    private readonly messagingService: MessagingService,
  ) {}

  private async getCourseOrThrow(courseId: string) {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async addTeacher(courseId: string, manageTeacherDto: ManageTeacherDto) {
    const course = await this.getCourseOrThrow(courseId);
    const teacherObjectId = new Types.ObjectId(manageTeacherDto.teacherId);

    const alreadyAssigned = course.teachers.some((teacher) => teacher.equals(teacherObjectId));
    if (!alreadyAssigned) {
      course.teachers.push(teacherObjectId);
      await course.save();
    }

    return course;
  }

  async removeTeacher(courseId: string, teacherId: string) {
    const course = await this.getCourseOrThrow(courseId);
    course.teachers = course.teachers.filter((teacher) => teacher.toString() !== teacherId);
    await course.save();

    return course;
  }

  async createQuiz(courseId: string, createQuizDto: CreateQuizDto) {
    const course = await this.getCourseOrThrow(courseId);
    const quiz = {
      title: createQuizDto.title,
      description: createQuizDto.description,
      createdAt: new Date(),
    };
    course.quizzes.push(quiz as any);
    await course.save();

    await this.messagingService.publish('quizCreated', {
      courseId,
      quiz: {
        title: quiz.title,
        description: quiz.description,
      },
    });

    return quiz;
  }

  async getQuizzes(courseId: string) {
    const course = await this.getCourseOrThrow(courseId);
    return course.quizzes;
  }

  async addDocument(courseId: string, file: Express.Multer.File, uploadDocumentDto: UploadDocumentDto) {
    const course = await this.getCourseOrThrow(courseId);
    const uploadPath = 'courses/' + courseId + '/documents';
    const uploadedUrl = await this.storageService.upload(file, uploadPath);

    const documentEntry = {
      name: uploadDocumentDto.name ?? file.originalname,
      description: uploadDocumentDto.description,
      url: uploadedUrl,
      uploadedAt: new Date(),
    };

    course.documents.push(documentEntry as any);
    await course.save();

    await this.messagingService.publish('documentUploaded', {
      courseId,
      document: {
        name: documentEntry.name,
        url: documentEntry.url,
      },
    });

    return documentEntry;
  }

  async addAssignment(courseId: string, createAssignmentDto: CreateAssignmentDto) {
    const course = await this.getCourseOrThrow(courseId);
    const assignment = {
      title: createAssignmentDto.title,
      description: createAssignmentDto.description,
      dueDate: createAssignmentDto.dueDate ? new Date(createAssignmentDto.dueDate) : undefined,
      assignedAt: new Date(),
    };

    course.assignments.push(assignment as any);
    await course.save();

    return assignment;
  }

  async addChatMessage(courseId: string, createChatMessageDto: CreateChatMessageDto) {
    const course = await this.getCourseOrThrow(courseId);
    const message = {
      sender: new Types.ObjectId(createChatMessageDto.senderId),
      message: createChatMessageDto.message,
      sentAt: new Date(),
    };

    course.chatMessages.push(message as any);
    await course.save();

    return message;
  }
}

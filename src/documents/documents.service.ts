import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Express } from 'express';
import { Model, Types } from 'mongoose';
import { StorageService } from '../storage/storage.service';
import { MessagingService } from '../messaging/messaging.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {
  DocumentEntity,
  DocumentEntityDocument,
} from './schemas/document.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentEntity.name)
    private readonly documentModel: Model<DocumentEntityDocument>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly storageService: StorageService,
    private readonly messagingService: MessagingService,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
    uploadedBy: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const course = await this.courseModel
      .findById(createDocumentDto.courseId)
      .exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const uploadPath = 'courses/' + course.id + '/documents';
    const url = await this.storageService.upload(file, uploadPath);

    const document = await this.documentModel.create({
      course: course._id,
      title: createDocumentDto.title ?? file.originalname,
      description: createDocumentDto.description,
      url,
      uploadedBy: new Types.ObjectId(uploadedBy),
      recipients:
        createDocumentDto.recipients?.map((id) => new Types.ObjectId(id)) ?? [],
    });

    await this.courseModel
      .findByIdAndUpdate(course._id, { $addToSet: { documents: document._id } })
      .exec();

    // Publish event
    const payload = JSON.stringify({
      documentId: document.id,
      courseId: course.id,
      title: document.title,
    });
    this.messagingService.publish(
      'events',
      'document.created',
      Buffer.from(payload),
    );

    return document.toObject();
  }

  async findByCourse(courseId: string) {
    return this.documentModel.find({ course: courseId }).lean().exec();
  }

  async findByCoursePaginated(courseId: string, page: number, limit: number) {
    const [items, total] = await Promise.all([
      this.documentModel
        .find({ course: courseId })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.documentModel.countDocuments({ course: courseId }).exec(),
    ]);
    return { items, total, page, limit };
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentModel
      .findByIdAndUpdate(id, { $set: updateDocumentDto }, { new: true })
      .lean()
      .exec();

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async remove(id: string) {
    const document = await this.documentModel.findByIdAndDelete(id).exec();
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    await this.courseModel
      .findByIdAndUpdate(document.course, {
        $pull: { documents: document._id },
      })
      .exec();
  }
}

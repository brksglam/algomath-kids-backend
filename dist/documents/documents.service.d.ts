import { Model, Types } from 'mongoose';
import { StorageService } from '../storage/storage.service';
import { MessagingService } from '../messaging/messaging.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity, DocumentEntityDocument } from './schemas/document.schema';
import { CourseDocument } from '../courses/schemas/course.schema';
export declare class DocumentsService {
    private readonly documentModel;
    private readonly courseModel;
    private readonly storageService;
    private readonly messagingService;
    constructor(documentModel: Model<DocumentEntityDocument>, courseModel: Model<CourseDocument>, storageService: StorageService, messagingService: MessagingService);
    create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File, uploadedBy: string): Promise<import("mongoose").Document<unknown, {}, DocumentEntity, {}, {}> & DocumentEntity & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, DocumentEntity, {}, {}> & DocumentEntity & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findByCoursePaginated(courseId: string, page: number, limit: number): Promise<{
        items: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, DocumentEntity, {}, {}> & DocumentEntity & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, DocumentEntity, {}, {}> & DocumentEntity & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
}

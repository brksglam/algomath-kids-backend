import type { Request } from 'express';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/document.schema").DocumentEntity, {}, {}> & import("./schemas/document.schema").DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByCourse(courseId: string, page?: number, limit?: number): Promise<{
        items: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/document.schema").DocumentEntity, {}, {}> & import("./schemas/document.schema").DocumentEntity & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/document.schema").DocumentEntity, {}, {}> & import("./schemas/document.schema").DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
}

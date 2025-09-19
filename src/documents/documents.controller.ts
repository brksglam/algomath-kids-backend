import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express, Request } from 'express';
import multer from 'multer';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' }, title: { type: 'string' }, description: { type: 'string' }, courseId: { type: 'string' } } } })
  @ApiOperation({ summary: 'Doküman yükle (S3) ve kursa bağla' })
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    return this.documentsService.create(createDocumentDto, file, user.userId);
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kursun dokümanlarını getir (sayfalı)' })
  findByCourse(@Param('courseId') courseId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.documentsService.findByCoursePaginated(courseId, +page, +limit);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Doküman güncelle' })
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Doküman sil' })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}

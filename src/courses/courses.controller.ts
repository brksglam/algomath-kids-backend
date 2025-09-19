import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Express } from 'express';
import multer from 'multer';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ManageCourseMemberDto } from './dto/manage-course-member.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesService } from './courses.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { DocumentsService } from '../documents/documents.service';
import { AssignmentsService } from '../assignments/assignments.service';
import { ChatService } from '../chat/chat.service';
import { CreateQuizDto } from '../quizzes/dto/create-quiz.dto';
import { CreateDocumentDto } from '../documents/dto/create-document.dto';
import { CreateAssignmentDto } from '../assignments/dto/create-assignment.dto';
import { CreateChatMessageDto } from '../chat/dto/create-chat-message.dto';

@ApiTags('Courses')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly quizzesService: QuizzesService,
    private readonly documentsService: DocumentsService,
    private readonly assignmentsService: AssignmentsService,
    private readonly chatService: ChatService,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Kurs oluştur' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Paginated course list' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Kursları listele (sayfalı)' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.coursesService.findAllPaginated(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Kurs detayını getir' })
  getDetail(@Param('id') id: string) {
    return this.coursesService.findOneWithRelations(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Kursu güncelle (chatPolicy dahil)' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Kursu sil' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Post(':id/teachers')
  @Roles(Role.Admin)
  addTeacher(@Param('id') id: string, @Body() manageCourseMemberDto: ManageCourseMemberDto) {
    return this.coursesService.addTeacher(id, manageCourseMemberDto);
  }

  @Delete(':id/teachers/:userId')
  @Roles(Role.Admin)
  removeTeacher(@Param('id') id: string, @Param('userId') userId: string) {
    return this.coursesService.removeTeacher(id, userId);
  }

  @Post(':id/students')
  @Roles(Role.Admin, Role.Teacher)
  addStudent(@Param('id') id: string, @Body() manageCourseMemberDto: ManageCourseMemberDto) {
    return this.coursesService.addStudent(id, manageCourseMemberDto);
  }

  @Delete(':id/students/:userId')
  @Roles(Role.Admin, Role.Teacher)
  removeStudent(@Param('id') id: string, @Param('userId') userId: string) {
    return this.coursesService.removeStudent(id, userId);
  }

  // Nested: Quizzes
  @Post(':id/quizzes')
  @Roles(Role.Teacher)
  @ApiOperation({ summary: 'Kursa quiz oluştur' })
  createQuiz(@Param('id') courseId: string, @Body() dto: Omit<CreateQuizDto, 'courseId'> & Partial<CreateQuizDto>) {
    const payload: CreateQuizDto = { ...dto, courseId } as CreateQuizDto;
    return this.quizzesService.create(payload);
  }

  @Get(':id/quizzes')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kursun quizlerini getir' })
  listQuizzes(@Param('id') courseId: string) {
    return this.quizzesService.findByCourse(courseId);
  }

  // Nested: Documents (S3 upload)
  @Post(':id/documents')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Kursa doküman yükle (S3, opsiyonel öğrenci hedefleme)' })
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  createDocument(
    @Param('id') courseId: string,
    @Body() dto: Omit<CreateDocumentDto, 'courseId'> & Partial<CreateDocumentDto>,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    const payload: CreateDocumentDto = { ...dto, courseId } as CreateDocumentDto;
    return this.documentsService.create(payload, file, user.userId);
  }

  // Nested: Assignments
  @Post(':id/assignments')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Kursa ödev oluştur (hedef atama yapılabilir)' })
  createAssignment(@Param('id') courseId: string, @Body() dto: Omit<CreateAssignmentDto, 'courseId'> & Partial<CreateAssignmentDto>) {
    const payload: CreateAssignmentDto = { ...dto, courseId } as CreateAssignmentDto;
    return this.assignmentsService.create(payload);
  }

  // Nested: Chat messages
  @Post(':id/chat')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kurs feed mesajı gönder (ChatPolicy uygulanır)' })
  createChatMessage(
    @Param('id') courseId: string,
    @Body() dto: Pick<CreateChatMessageDto, 'content'>,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    return this.chatService.createMessage(courseId, user.userId, dto.content);
  }
}

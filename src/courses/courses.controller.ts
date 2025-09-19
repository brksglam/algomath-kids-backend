import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import multer from 'multer';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ManageTeacherDto } from './dto/manage-teacher.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post(':id/teachers')
  @Roles(Role.Admin)
  addTeacher(@Param('id') id: string, @Body() manageTeacherDto: ManageTeacherDto) {
    return this.coursesService.addTeacher(id, manageTeacherDto);
  }

  @Delete(':id/teachers/:teacherId')
  @Roles(Role.Admin)
  removeTeacher(@Param('id') id: string, @Param('teacherId') teacherId: string) {
    return this.coursesService.removeTeacher(id, teacherId);
  }

  @Post(':id/quizzes')
  @Roles(Role.Teacher)
  createQuiz(@Param('id') id: string, @Body() createQuizDto: CreateQuizDto) {
    return this.coursesService.createQuiz(id, createQuizDto);
  }

  @Get(':id/quizzes')
  getQuizzes(@Param('id') id: string) {
    return this.coursesService.getQuizzes(id);
  }

  @Post(':id/documents')
  @Roles(Role.Teacher)
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  addDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDocumentDto: UploadDocumentDto,
  ) {
    return this.coursesService.addDocument(id, file, uploadDocumentDto);
  }

  @Post(':id/assignments')
  @Roles(Role.Teacher)
  addAssignment(@Param('id') id: string, @Body() createAssignmentDto: CreateAssignmentDto) {
    return this.coursesService.addAssignment(id, createAssignmentDto);
  }

  @Post(':id/chat')
  @Roles(Role.Teacher, Role.Student, Role.Admin)
  addChatMessage(@Param('id') id: string, @Body() createChatMessageDto: CreateChatMessageDto) {
    return this.coursesService.addChatMessage(id, createChatMessageDto);
  }
}

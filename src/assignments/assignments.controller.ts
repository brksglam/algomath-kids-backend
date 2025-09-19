import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express, Request } from 'express';
import multer from 'multer';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AssignmentsService } from './assignments.service';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  findByCourse(@Param('courseId') courseId: string) {
    return this.assignmentsService.findByCourse(courseId);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Teacher)
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Patch(':id/students')
  @Roles(Role.Admin, Role.Teacher)
  assignStudents(@Param('id') id: string, @Body() assignStudentsDto: AssignStudentsDto) {
    return this.assignmentsService.assignStudents(id, assignStudentsDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }

  @Post(':id/submissions')
  @Roles(Role.Student)
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  submit(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    return this.assignmentsService.submit(id, user.userId, file);
  }
}

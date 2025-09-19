import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Ödev oluştur' })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kursun ödevlerini getir (sayfalı)' })
  findByCourse(
    @Param('courseId') courseId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.assignmentsService.findByCoursePaginated(
      courseId,
      +page,
      +limit,
    );
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Ödevi güncelle' })
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Patch(':id/students')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Ödevin öğrenci listesini güncelle' })
  assignStudents(
    @Param('id') id: string,
    @Body() assignStudentsDto: AssignStudentsDto,
  ) {
    return this.assignmentsService.assignStudents(id, assignStudentsDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Ödevi sil' })
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }

  @Post(':id/submissions')
  @Roles(Role.Student)
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOperation({ summary: 'Ödev teslim yükle (dosya)' })
  submit(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    return this.assignmentsService.submit(id, user.userId, file);
  }
}

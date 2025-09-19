import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { SchedulingService } from './scheduling.service';

class UpsertAvailabilityDto { weeklySlots: string[] }
class CreateLessonDto { teacherId: string; studentId: string; courseId: string; startAt: string; endAt: string }

@ApiTags('Scheduling')
@ApiBearerAuth()
@Controller('scheduling')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post('availability/:teacherId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - Öğretmen uygunluk saatlerini ayarla' })
  upsertAvailability(@Param('teacherId') teacherId: string, @Body() dto: UpsertAvailabilityDto) {
    return this.schedulingService.upsertAvailability(teacherId, dto.weeklySlots);
  }

  @Get('availability/:teacherId')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Admin/Teacher - Öğretmen uygunluk saatlerini getir' })
  getAvailability(@Param('teacherId') teacherId: string) {
    return this.schedulingService.getAvailability(teacherId);
  }

  @Post('lessons')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Admin/Teacher - Ders randevusu oluştur' })
  createLesson(@Body() dto: CreateLessonDto) {
    return this.schedulingService.createLesson(dto.teacherId, dto.studentId, dto.courseId, new Date(dto.startAt), new Date(dto.endAt));
  }

  @Get('lessons/teacher/:teacherId')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Admin/Teacher - Öğretmenin randevularını listele' })
  listByTeacher(@Param('teacherId') teacherId: string) {
    return this.schedulingService.listLessonsByTeacher(teacherId);
  }

  @Get('lessons/student/:studentId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Admin/Teacher/Student - Öğrencinin randevularını listele' })
  listByStudent(@Param('studentId') studentId: string) {
    return this.schedulingService.listLessonsByStudent(studentId);
  }
}



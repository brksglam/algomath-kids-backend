import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kursun quizlerini getir (sayfalanmış)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findByCourse(@Param('courseId') courseId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.quizzesService.findByCoursePaginated(courseId, +page, +limit);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Teacher)
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }

  @Post(':id/attempts')
  @Roles(Role.Student)
  submit(@Param('id') id: string, @Body() submitQuizDto: SubmitQuizDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.quizzesService.submit(id, user.userId, submitQuizDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({
    summary: 'Kurs feed mesajı veya DM gönder (recipientId varsa DM)',
  })
  create(
    @Body() createChatMessageDto: CreateChatMessageDto,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string };
    return this.chatService.createMessage(
      createChatMessageDto.courseId,
      user.userId,
      createChatMessageDto.content,
      createChatMessageDto.recipientId,
    );
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @ApiOperation({ summary: 'Kurs feed mesajlarını getir' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findByCourse(
    @Param('courseId') courseId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.chatService.findByCourse(courseId, +page, +limit);
  }
}

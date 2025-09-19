import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  create(@Body() createChatMessageDto: CreateChatMessageDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.chatService.createMessage(createChatMessageDto.courseId, user.userId, createChatMessageDto.content);
  }

  @Get('course/:courseId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  findByCourse(@Param('courseId') courseId: string) {
    return this.chatService.findByCourse(courseId);
  }
}

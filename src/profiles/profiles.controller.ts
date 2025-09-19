import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { ProfilesService } from './profiles.service';

class UpsertProfileDto {
  subjects?: string[];
  bio?: string;
  certifications?: string[];
}

@ApiTags('Profiles')
@ApiBearerAuth()
@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch(':userId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - Öğretmen profili oluştur/güncelle' })
  upsert(@Param('userId') userId: string, @Body() dto: UpsertProfileDto) {
    return this.profilesService.upsert(userId, dto);
  }

  @Get(':userId')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Admin/Teacher - Öğretmen profilini getir' })
  get(@Param('userId') userId: string) {
    return this.profilesService.findByUser(userId);
  }
}

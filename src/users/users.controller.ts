import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PageDto, PageMetaDto, PageOptionsDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - kullanıcı oluştur' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOkResponse({ description: 'Paginated users list' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Admin - kullanıcıları listele (sayfalı)' })
  async findAll(@Query() { page = 1, limit = 10 }: PageOptionsDto): Promise<PageDto<unknown>> {
    const { items, total } = await this.usersService.findAllPaginated(page, limit);
    const meta = new PageMetaDto({ page, limit, totalItems: total, totalPages: Math.ceil(total / limit) });
    return new PageDto(items, meta);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - kullanıcı detayı' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user.toObject();
    return rest;
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - kullanıcı güncelle' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Admin - kullanıcı sil' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

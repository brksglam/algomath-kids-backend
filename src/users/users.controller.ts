import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) return null;
    const obj = user.toObject() as unknown as {
      password?: unknown;
    } & Record<string, unknown>;
    const { password: _password, ...safe } = obj;
    return safe;
  }
}

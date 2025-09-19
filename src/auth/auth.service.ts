import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/roles.enum';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const role = registerDto.role ?? Role.Student;
    if (role !== Role.Student) {
      throw new ForbiddenException('Only students can self-register');
    }

    const user = await this.usersService.create({ ...registerDto, role });
    return this.sanitizeUser(user);
  }

  async adminCreateUser(adminCreateUserDto: AdminCreateUserDto) {
    const existingUser = await this.usersService.findByEmail(adminCreateUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.create(adminCreateUserDto);
    return this.sanitizeUser(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  private async validateUser(email: string, pass: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private sanitizeUser(user: UserDocument) {
    const { password, ...safeUser } = user.toObject();
    return safeUser;
  }
}

import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums/roles.enum';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export interface JwtPayload {
    sub: string;
    email: string;
    roles: Role[];
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly saltRounds;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        email: string;
        name: string;
        roles: Role[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    private validateUser;
}

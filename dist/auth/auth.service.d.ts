import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums/roles.enum';
import { UsersService } from '../users/users.service';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        email: string;
        name: string;
        role: Role;
        courses: import("mongoose").Types.ObjectId[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    adminCreateUser(adminCreateUserDto: AdminCreateUserDto): Promise<{
        email: string;
        name: string;
        role: Role;
        courses: import("mongoose").Types.ObjectId[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    private validateUser;
    private sanitizeUser;
}

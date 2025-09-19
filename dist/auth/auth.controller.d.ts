import { Role } from '../common/enums/roles.enum';
import { AuthService } from './auth.service';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
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
    adminRegister(adminCreateUserDto: AdminCreateUserDto): Promise<{
        email: string;
        name: string;
        role: Role;
        courses: import("mongoose").Types.ObjectId[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
}

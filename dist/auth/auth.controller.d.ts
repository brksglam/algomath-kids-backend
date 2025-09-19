import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        email: string;
        name: string;
        roles: import("../common/enums/roles.enum").Role[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}

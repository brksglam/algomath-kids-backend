import { AuthService } from './auth.service';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        password?: unknown;
    } & Record<string, unknown>>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    adminRegister(adminCreateUserDto: AdminCreateUserDto): Promise<{
        password?: unknown;
    } & Record<string, unknown>>;
}

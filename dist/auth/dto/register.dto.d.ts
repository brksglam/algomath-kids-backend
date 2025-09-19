import { Role } from '../../common/enums/roles.enum';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    roles?: Role[];
}

import { Role } from '../../common/enums/roles.enum';
export declare class AdminCreateUserDto {
    email: string;
    password: string;
    name: string;
    role: Role;
}

import { Role } from '../../common/enums/roles.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    roles?: Role[];
}

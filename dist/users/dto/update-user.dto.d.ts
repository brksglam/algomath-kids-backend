import { Role } from '../../common/enums/roles.enum';
import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role?: Role;
    courses?: string[];
}
export {};

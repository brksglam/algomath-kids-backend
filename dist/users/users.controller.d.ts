import { Role } from '../common/enums/roles.enum';
import { PageDto, PageOptionsDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll({ page, limit }: PageOptionsDto): Promise<PageDto<unknown>>;
    findOne(id: string): Promise<{
        email: string;
        name: string;
        role: Role;
        courses: import("mongoose").Types.ObjectId[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User>;
    remove(id: string): Promise<void>;
}

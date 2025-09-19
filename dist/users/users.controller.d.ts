import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getById(id: string): Promise<{
        [x: string]: unknown;
    } | null>;
}

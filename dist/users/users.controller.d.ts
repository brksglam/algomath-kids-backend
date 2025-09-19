import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getById(id: string): Promise<({
        password?: unknown;
    } & Record<string, unknown>) | null>;
}

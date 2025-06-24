import { NotFoundException } from '@shared/exceptions';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { Result } from 'oxide.ts';
export declare class DeleteUserCommand {
    readonly userId: string;
    constructor(props: DeleteUserCommand);
}
export declare class DeleteUserService {
    private readonly userRepo;
    constructor(userRepo: UserRepositoryPort);
    execute(command: DeleteUserCommand): Promise<Result<boolean, NotFoundException>>;
}

import { UserRepositoryPort } from '../../database/user.repository.port';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { CreateUserCommand } from './create-user.command';
import { UserAlreadyExistsError } from '../../domain/user.errors';
import { AggregateID } from '@shared/ddd';
export declare class CreateUserService implements ICommandHandler {
    protected readonly userRepo: UserRepositoryPort;
    constructor(userRepo: UserRepositoryPort);
    execute(command: CreateUserCommand): Promise<Result<AggregateID, UserAlreadyExistsError>>;
}

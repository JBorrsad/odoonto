import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { NotFoundException } from '@shared/exceptions';
import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserEntity } from '../../domain/user.entity';

export class FindUserByIdQuery {
    readonly userId: string;

    constructor(props: { userId: string }) {
        this.userId = props.userId;
    }
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepositoryPort,
    ) { }

    async execute(
        query: FindUserByIdQuery,
    ): Promise<Result<UserEntity, NotFoundException>> {
        const userResult = await this.userRepo.findOneById(query.userId);

        if (userResult.isNone()) {
            return Err(new NotFoundException('User not found'));
        }

        return Ok(userResult.unwrap());
    }
} 
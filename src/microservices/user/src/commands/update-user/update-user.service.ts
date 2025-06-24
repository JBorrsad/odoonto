import { UserRepositoryPort } from '../../database/user.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UpdateUserCommand } from './update-user.command';
import { NotFoundException } from '@shared/exceptions';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { UserMapper } from '../../user.mapper';

@CommandHandler(UpdateUserCommand)
export class UpdateUserService implements ICommandHandler {
    constructor(
        @Inject(USER_REPOSITORY)
        protected readonly userRepo: UserRepositoryPort,
        private readonly userMapper: UserMapper,
    ) { }

    async execute(
        command: UpdateUserCommand,
    ): Promise<Result<UserResponseDto, NotFoundException>> {
        try {
            const userResult = await this.userRepo.findOneById(command.userId);
            if (userResult.isNone()) {
                return Err(new NotFoundException('User not found'));
            }

            const user = userResult.unwrap();

            user.updateAddress({
                country: command.country,
                postalCode: command.postalCode,
                street: command.street,
            });

            await this.userRepo.transaction(async () =>
                this.userRepo.updateAddress(user)
            );

            const response = this.userMapper.toResponse(user);
            return Ok(response);
        } catch (error: any) {
            return Err(new NotFoundException('Error updating user'));
        }
    }
} 
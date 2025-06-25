import { UserRepositoryPort } from '../../database/user.repository.port';
import { Address } from '../../domain/value-objects/address.value-object';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CreateUserCommand } from './create-user.command';
import { UserAlreadyExistsError } from '../../domain/user.errors';
import { AggregateID } from '@shared/ddd';
import { UserEntity } from '../../domain/user.entity';
import { ConflictException } from '@shared/exceptions';
import { Inject, Logger } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { RabbitMQService } from '../../infrastructure/messaging/rabbitmq.service';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
    private readonly rabbitMQService: RabbitMQService,
  ) { }

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
    const user = UserEntity.create({
      email: command.email,
      address: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.userRepo.transaction(async () => this.userRepo.insert(user));

      // Publicar evento de usuario creado para otros microservicios
      const userProps = user.getProps();
      await this.rabbitMQService.publishEvent('user.created', {
        userId: user.id,
        email: userProps.email,
        address: {
          country: userProps.address.country,
          postalCode: userProps.address.postalCode,
          street: userProps.address.street,
        },
        role: userProps.role,
        createdAt: new Date().toISOString(),
      });

      this.logger.log(`📤 User created event published for user: ${user.id}`);

      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}

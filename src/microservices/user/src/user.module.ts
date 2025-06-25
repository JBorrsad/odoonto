import { Logger, Module, Provider } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { RabbitMQService } from './infrastructure/messaging/rabbitmq.service';
import { UserRepository } from './database/user.repository';
import { DatabaseModule } from './database/database.module';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { DeleteUserHttpController } from './commands/delete-user/delete-user.http-controller';
import { UpdateUserHttpController } from './commands/update-user/update-user.http.controller';
// import { CreateUserCliController } from './commands/create-user/create-user.cli.controller';
import { FindUsersHttpController } from './queries/find-users/find-users.http.controller';
import { FindUserByIdHttpController } from './queries/find-user-by-id/find-user-by-id.http.controller';
import { CreateUserMessageController } from './commands/create-user/create-user.message.controller';
// import { CreateUserGraphqlResolver } from './commands/create-user/graphql-example/create-user.graphql-resolver';
import { CreateUserService } from './commands/create-user/create-user.service';
import { DeleteUserService } from './commands/delete-user/delete-user.service';
import { UpdateUserService } from './commands/update-user/update-user.service';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';
import { FindUserByIdQueryHandler } from './queries/find-user-by-id/find-user-by-id.query-handler';
import { UserMapper } from './user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from './user.di-tokens';
// import { FindUsersGraphqlResolver } from './queries/find-users/find-users.graphql-resolver';
import { HealthController } from './health/health.controller';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  UpdateUserHttpController,
  FindUsersHttpController,
  FindUserByIdHttpController,
  HealthController,
];

const messageControllers = [CreateUserMessageController];

// const cliControllers: Provider[] = [CreateUserCliController];

// const graphqlResolvers: Provider[] = [
//   CreateUserGraphqlResolver,
//   FindUsersGraphqlResolver,
// ];

const commandHandlers: Provider[] = [CreateUserService, DeleteUserService, UpdateUserService];

const queryHandlers: Provider[] = [FindUsersQueryHandler, FindUserByIdQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

const messagingServices: Provider[] = [RabbitMQService];

@Module({
  imports: [
    RequestContextModule,
    DatabaseModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    // ...cliControllers,
    ...repositories,
    ...messagingServices,
    // ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule { }

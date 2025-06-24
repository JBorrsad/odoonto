import { CommandBus } from '@nestjs/cqrs';
import { CreateUserGqlRequestDto } from './dtos/create-user.gql-request.dto';
import { IdGqlResponse } from './dtos/id.gql-response.dto';
export declare class CreateUserGraphqlResolver {
  private readonly commandBus;
  constructor(commandBus: CommandBus);
  create(input: CreateUserGqlRequestDto): Promise<IdGqlResponse>;
}

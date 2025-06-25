import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { Result, match } from 'oxide.ts';
import { UserGraphqlResponseDto } from '../../dtos/graphql/user.graphql-response.dto';
import { FindUsersQuery } from './find-users.query-handler';
import { UserMapper } from '../../user.mapper';
import { UserEntity } from '../../domain/user.entity';

@Resolver()
export class FindUsersGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userMapper: UserMapper,
  ) { }

  @Query(() => [UserGraphqlResponseDto], { name: 'users' })
  async findUsers(): Promise<UserGraphqlResponseDto[]> {
    const findUsersQuery = new FindUsersQuery();

    const result: Result<UserEntity[], Error> = await this.queryBus.execute(findUsersQuery);

    return match(result, {
      Ok: (users: UserEntity[]) => {
        return users.map((user) => this.userMapper.toResponse(user));
      },
      Err: (error: Error) => {
        throw error;
      },
    });
  }
}

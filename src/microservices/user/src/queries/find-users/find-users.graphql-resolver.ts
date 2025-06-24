import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Result, match } from 'oxide.ts';
import { ResponseBase } from '@shared/api/response.base';
import { Paginated } from '@shared/ddd';
import { PaginatedParams } from '@shared/ddd/query.base';
import { UserModel } from '../../database/user.repository';
import { UserPaginatedGraphqlResponseDto } from '../../dtos/graphql/user.paginated-gql-response.dto';
import { FindUsersQuery } from './find-users.query-handler';
import { UserMapper } from '../../user.mapper';
import { UserEntity } from '../../domain/user.entity';

@Resolver()
export class FindUsersGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userMapper: UserMapper,
  ) { }

  @Query(() => UserPaginatedGraphqlResponseDto, { name: 'users' })
  async findUsers(
    @Args('country', { nullable: true }) country?: string,
    @Args('postalCode', { nullable: true }) postalCode?: string,
    @Args('street', { nullable: true }) street?: string,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('page', { nullable: true }) page?: number,
  ): Promise<UserPaginatedGraphqlResponseDto> {
    const findUsersQuery = new FindUsersQuery({
      country,
      postalCode,
      street,
      limit: limit || 20,
      page: page || 1,
    });

    const result: Result<Paginated<UserEntity>, Error> = await this.queryBus.execute(findUsersQuery);

    return match(result, {
      Ok: (paginated: Paginated<UserEntity>) => {
        return new UserPaginatedGraphqlResponseDto({
          ...paginated,
          data: paginated.data.map((user) => this.userMapper.toResponse(user)),
        });
      },
      Err: (error: Error) => {
        throw error;
      },
    });
  }
}

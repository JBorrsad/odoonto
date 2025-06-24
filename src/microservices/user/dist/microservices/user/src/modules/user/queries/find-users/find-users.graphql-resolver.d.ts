import { QueryBus } from '@nestjs/cqrs';
import { PaginatedParams } from '@shared/ddd/query.base';
import { UserPaginatedGraphqlResponseDto } from '../../dtos/graphql/user.paginated-gql-response.dto';
import { FindUsersQuery } from './find-users.query-handler';
export declare class FindUsersGraphqlResolver {
  private readonly queryBus;
  constructor(queryBus: QueryBus);
  findUsers(
    options: PaginatedParams<FindUsersQuery>,
  ): Promise<UserPaginatedGraphqlResponseDto>;
}

import { QueryBus } from '@nestjs/cqrs';
import { FindUsersRequestDto } from './find-users.request.dto';
import { UserPaginatedResponseDto } from '../../dtos/user.paginated.response.dto';
import { PaginatedQueryRequestDto } from '@shared/api/paginated-query.request.dto';
export declare class FindUsersHttpController {
  private readonly queryBus;
  constructor(queryBus: QueryBus);
  findUsers(
    request: FindUsersRequestDto,
    queryParams: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto>;
}

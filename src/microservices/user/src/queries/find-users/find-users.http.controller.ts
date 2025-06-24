import { Controller, Get, Query } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { UserPaginatedResponseDto } from '../../dtos/user.paginated.response.dto';
import { FindUsersQuery } from './find-users.query-handler';
import { FindUsersRequestDto } from './find-users.request.dto';
import { UserMapper } from '../../user.mapper';
import { UserEntity } from '../../domain/user.entity';
import { Paginated } from '@shared/ddd';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userMapper: UserMapper,
  ) { }

  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserPaginatedResponseDto,
  })
  @Get(routesV1.user.root)
  async findUsers(@Query() query: FindUsersRequestDto): Promise<UserPaginatedResponseDto> {
    const findUsersQuery = new FindUsersQuery({
      country: query.country,
      limit: query.limit,
      page: query.page,
      postalCode: query.postalCode,
      street: query.street,
    });

    const result: Result<Paginated<UserEntity>, Error> = await this.queryBus.execute(findUsersQuery);

    return match(result, {
      Ok: (paginated: Paginated<UserEntity>) => {
        return new UserPaginatedResponseDto({
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

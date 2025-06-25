import { Controller, Get } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { FindUsersQuery } from './find-users.query-handler';
import { UserMapper } from '../../user.mapper';
import { UserEntity } from '../../domain/user.entity';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userMapper: UserMapper,
  ) { }

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'All users found',
    type: [UserResponseDto],
  })
  @Get(routesV1.user.root)
  async findUsers(): Promise<UserResponseDto[]> {
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

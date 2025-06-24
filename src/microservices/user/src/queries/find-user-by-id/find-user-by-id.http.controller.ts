import {
    Controller,
    Get,
    HttpStatus,
    NotFoundException as NotFoundHttpException,
    Param,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { match, Result } from 'oxide.ts';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { NotFoundException } from '@shared/exceptions';
import { ApiErrorResponse } from '@shared/api/api-error.response';
import { FindUserByIdQuery } from './find-user-by-id.query-handler';
import { UserEntity } from '../../domain/user.entity';
import { UserMapper } from '../../user.mapper';

@Controller(routesV1.version)
export class FindUserByIdHttpController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly userMapper: UserMapper,
    ) { }

    @ApiOperation({ summary: 'Find user by id' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: UserResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: NotFoundException.message,
        type: ApiErrorResponse,
    })
    @Get(routesV1.user.byId)
    async findUserById(@Param('id') id: string): Promise<UserResponseDto> {
        const query = new FindUserByIdQuery({ userId: id });
        const result: Result<UserEntity, NotFoundException> =
            await this.queryBus.execute(query);

        return match(result, {
            Ok: (user: UserEntity) => this.userMapper.toResponse(user),
            Err: (error: Error) => {
                if (error instanceof NotFoundException)
                    throw new NotFoundHttpException(error.message);
                throw error;
            },
        });
    }
} 
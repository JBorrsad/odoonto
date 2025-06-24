import {
    Body,
    Controller,
    HttpStatus,
    NotFoundException as NotFoundHttpException,
    Param,
    Put,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { match, Result } from 'oxide.ts';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserRequestDto } from './update-user.request.dto';
import { NotFoundException } from '@shared/exceptions';
import { ApiErrorResponse } from '@shared/api/api-error.response';
import { UserResponseDto } from '../../dtos/user.response.dto';

@Controller(routesV1.version)
export class UpdateUserHttpController {
    constructor(private readonly commandBus: CommandBus) { }

    @ApiOperation({ summary: 'Update user address' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: UserResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: NotFoundException.message,
        type: ApiErrorResponse,
    })
    @Put(routesV1.user.byId)
    async updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserRequestDto,
    ): Promise<UserResponseDto> {
        const command = new UpdateUserCommand({ userId: id, ...body });
        const result: Result<UserResponseDto, NotFoundException> =
            await this.commandBus.execute(command);

        return match(result, {
            Ok: (user: UserResponseDto) => user,
            Err: (error: Error) => {
                if (error instanceof NotFoundException)
                    throw new NotFoundHttpException(error.message);
                throw error;
            },
        });
    }
} 
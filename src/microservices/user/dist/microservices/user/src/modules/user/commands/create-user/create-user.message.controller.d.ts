import { CommandBus } from '@nestjs/cqrs';
import { CreateUserRequestDto } from './create-user.request.dto';
import { IdResponse } from '@shared/api/id.response.dto';
export declare class CreateUserMessageController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    create(message: CreateUserRequestDto): Promise<IdResponse>;
}

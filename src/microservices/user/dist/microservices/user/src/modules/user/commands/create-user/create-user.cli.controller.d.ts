import { CommandBus } from '@nestjs/cqrs';
import { LoggerPort } from '@shared/ports/logger.port';
export declare class CreateUserCliController {
    private readonly commandBus;
    private readonly logger;
    constructor(commandBus: CommandBus, logger: LoggerPort);
    createUser(email: string, country: string, postalCode: string, street: string): Promise<void>;
}

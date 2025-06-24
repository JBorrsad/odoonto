import { CommandBus } from '@nestjs/cqrs';
export declare class DeleteUserHttpController {
  private readonly commandBus;
  constructor(commandBus: CommandBus);
  deleteUser(id: string): Promise<void>;
}

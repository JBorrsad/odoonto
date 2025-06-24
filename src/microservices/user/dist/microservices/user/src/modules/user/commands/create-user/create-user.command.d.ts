import { Command, CommandProps } from '@shared/ddd';
export declare class CreateUserCommand extends Command {
  readonly email: string;
  readonly country: string;
  readonly postalCode: string;
  readonly street: string;
  constructor(props: CommandProps<CreateUserCommand>);
}

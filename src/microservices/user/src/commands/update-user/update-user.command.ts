import { Command, CommandProps } from '@shared/ddd';

export class UpdateUserCommand extends Command {
    readonly userId: string;

    readonly country?: string;

    readonly postalCode?: string;

    readonly street?: string;

    constructor(props: CommandProps<UpdateUserCommand>) {
        super(props);
        this.userId = props.userId;
        this.country = props.country;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
} 
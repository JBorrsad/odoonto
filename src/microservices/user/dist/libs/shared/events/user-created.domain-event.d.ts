import { DomainEvent, DomainEventProps } from '../ddd';
export declare class UserCreatedDomainEvent extends DomainEvent {
    readonly email: string;
    readonly country: string;
    readonly postalCode: string;
    readonly street: string;
    constructor(props: DomainEventProps<UserCreatedDomainEvent>);
}

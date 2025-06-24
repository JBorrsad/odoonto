import { DomainEvent, DomainEventProps } from '@shared/ddd';
export declare class UserDeletedDomainEvent extends DomainEvent {
    constructor(props: DomainEventProps<UserDeletedDomainEvent>);
}

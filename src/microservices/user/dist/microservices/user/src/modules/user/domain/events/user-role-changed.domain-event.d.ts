import { DomainEvent, DomainEventProps } from '@shared/ddd';
import { UserRoles } from '../user.types';
export declare class UserRoleChangedDomainEvent extends DomainEvent {
    readonly oldRole: UserRoles;
    readonly newRole: UserRoles;
    constructor(props: DomainEventProps<UserRoleChangedDomainEvent>);
}

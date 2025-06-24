import { DomainEvent, DomainEventProps } from '@shared/ddd';
export declare class UserAddressUpdatedDomainEvent extends DomainEvent {
  readonly country: string;
  readonly street: string;
  readonly postalCode: string;
  constructor(props: DomainEventProps<UserAddressUpdatedDomainEvent>);
}

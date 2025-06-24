import { DomainEvent, DomainEventProps } from '@shared/ddd';
export declare class WalletCreatedDomainEvent extends DomainEvent {
  readonly userId: string;
  constructor(props: DomainEventProps<WalletCreatedDomainEvent>);
}

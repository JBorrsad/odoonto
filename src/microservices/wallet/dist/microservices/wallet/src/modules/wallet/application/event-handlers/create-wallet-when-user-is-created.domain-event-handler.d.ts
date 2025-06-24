import { UserCreatedDomainEvent } from '@shared/events/user-created.domain-event';
import { WalletRepositoryPort } from '../../database/wallet.repository.port';
export declare class CreateWalletWhenUserIsCreatedDomainEventHandler {
  private readonly walletRepo;
  constructor(walletRepo: WalletRepositoryPort);
  handle(event: UserCreatedDomainEvent): Promise<any>;
}

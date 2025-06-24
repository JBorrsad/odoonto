import { RepositoryPort } from '@shared/ddd';
import { WalletEntity } from '../domain/wallet.entity';
export type WalletRepositoryPort = RepositoryPort<WalletEntity>;

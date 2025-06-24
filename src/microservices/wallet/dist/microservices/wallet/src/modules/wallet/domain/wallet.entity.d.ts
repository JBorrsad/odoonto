import { AggregateID, AggregateRoot } from '@shared/ddd';
import { Result } from 'oxide.ts';
import { WalletNotEnoughBalanceError } from './wallet.errors';
export interface CreateWalletProps {
  userId: AggregateID;
}
export interface WalletProps extends CreateWalletProps {
  balance: number;
}
export declare class WalletEntity extends AggregateRoot<WalletProps> {
  protected readonly _id: AggregateID;
  static create(create: CreateWalletProps): WalletEntity;
  deposit(amount: number): void;
  withdraw(amount: number): Result<null, WalletNotEnoughBalanceError>;
  validate(): void;
}

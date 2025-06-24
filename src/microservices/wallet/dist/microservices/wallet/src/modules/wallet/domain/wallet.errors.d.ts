import { ExceptionBase } from '@shared/exceptions';
export declare class WalletNotEnoughBalanceError extends ExceptionBase {
  static readonly message = 'Wallet has not enough balance';
  readonly code = 'WALLET.NOT_ENOUGH_BALANCE';
  constructor(metadata?: unknown);
}

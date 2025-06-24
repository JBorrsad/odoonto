import { Mapper } from '@shared/ddd';
import { WalletEntity } from './domain/wallet.entity';
import { WalletModel } from './database/wallet.repository';
export declare class WalletMapper implements Mapper<WalletEntity, WalletModel> {
  toPersistence(entity: WalletEntity): WalletModel;
  toDomain(record: WalletModel): WalletEntity;
  toResponse(): any;
}

import { DatabasePool } from 'slonik';
import { z } from 'zod';
import { SqlRepositoryBase } from '@shared/db/sql-repository.base';
import { WalletRepositoryPort } from './wallet.repository.port';
import { WalletEntity } from '../domain/wallet.entity';
import { WalletMapper } from '../wallet.mapper';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare const walletSchema: z.ZodObject<
  {
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    balance: z.ZodNumber;
    userId: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    balance?: number;
    userId?: string;
  },
  {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    balance?: number;
    userId?: string;
  }
>;
export type WalletModel = z.TypeOf<typeof walletSchema>;
export declare class WalletRepository
  extends SqlRepositoryBase<WalletEntity, WalletModel>
  implements WalletRepositoryPort
{
  protected tableName: string;
  protected schema: z.ZodObject<
    {
      id: z.ZodString;
      createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
      updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
      balance: z.ZodNumber;
      userId: z.ZodString;
    },
    'strip',
    z.ZodTypeAny,
    {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      balance?: number;
      userId?: string;
    },
    {
      id?: string;
      createdAt?: unknown;
      updatedAt?: unknown;
      balance?: number;
      userId?: string;
    }
  >;
  constructor(
    pool: DatabasePool,
    mapper: WalletMapper,
    eventEmitter: EventEmitter2,
  );
}

import { AggregateRoot, PaginatedQueryParams, Paginated } from '@shared/ddd';
import { Mapper } from '@shared/ddd';
import { RepositoryPort } from '@shared/ddd';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Option } from 'oxide.ts';
import {
  DatabasePool,
  DatabaseTransactionConnection,
  MixedRow,
  PrimitiveValueExpression,
  QueryResult,
  QueryResultRow,
  SqlSqlToken,
} from 'slonik';
import { ZodTypeAny, TypeOf, ZodObject } from 'zod';
import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral } from '../types';
export declare abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  private readonly _pool;
  protected readonly mapper: Mapper<Aggregate, DbModel>;
  protected readonly eventEmitter: EventEmitter2;
  protected readonly logger: LoggerPort;
  protected abstract tableName: string;
  protected abstract schema: ZodObject<any>;
  protected constructor(
    _pool: DatabasePool,
    mapper: Mapper<Aggregate, DbModel>,
    eventEmitter: EventEmitter2,
    logger: LoggerPort,
  );
  findOneById(id: string): Promise<Option<Aggregate>>;
  findAll(): Promise<Aggregate[]>;
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Aggregate>>;
  delete(entity: Aggregate): Promise<boolean>;
  insert(entity: Aggregate | Aggregate[]): Promise<void>;
  protected writeQuery<T>(
    sql: SqlSqlToken<
      T extends MixedRow ? T : Record<string, PrimitiveValueExpression>
    >,
    entity: Aggregate | Aggregate[],
  ): Promise<
    QueryResult<
      T extends MixedRow
        ? T extends ZodTypeAny
          ? TypeOf<ZodTypeAny & MixedRow & T>
          : T
        : T
    >
  >;
  protected generateInsertQuery(models: DbModel[]): SqlSqlToken<QueryResultRow>;
  transaction<T>(handler: () => Promise<T>): Promise<T>;
  protected get pool(): DatabasePool | DatabaseTransactionConnection;
}

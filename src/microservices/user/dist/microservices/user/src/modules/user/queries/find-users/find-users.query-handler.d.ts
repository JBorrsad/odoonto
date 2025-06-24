import { IQueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@shared/ddd/query.base';
import { Paginated } from '@shared/ddd';
import { DatabasePool } from 'slonik';
import { UserModel } from '../../database/user.repository';
export declare class FindUsersQuery extends PaginatedQueryBase {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
  constructor(props: PaginatedParams<FindUsersQuery>);
}
export declare class FindUsersQueryHandler implements IQueryHandler {
  private readonly pool;
  constructor(pool: DatabasePool);
  execute(query: FindUsersQuery): Promise<Result<Paginated<UserModel>, Error>>;
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Err, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { UserModel, userSchema } from '../../database/user.repository';
import { UserMapper } from '../../user.mapper';
import { UserEntity } from '../../domain/user.entity';

export class FindUsersQuery { }

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
    private readonly userMapper: UserMapper,
  ) { }

  async execute(): Promise<Result<UserEntity[], Error>> {
    try {
      const statement = sql.type(userSchema)`
        SELECT *
        FROM users
        ORDER BY "createdAt" DESC`;

      const records = await this.pool.query(statement);

      console.log('Records found:', records.rowCount);
      console.log('First record:', records.rows[0]);

      const users = records.rows.map((row) =>
        this.userMapper.toDomain(row as UserModel)
      );

      console.log('Users mapped:', users.length);

      return Ok(users);
    } catch (error) {
      console.error('Error in FindUsersQueryHandler:', error);
      return Err(error as Error);
    }
  }
}

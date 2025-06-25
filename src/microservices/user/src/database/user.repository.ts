import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { UserRepositoryPort } from './user.repository.port';
import { z } from 'zod';
import { UserMapper } from '../user.mapper';

import { UserEntity } from '../domain/user.entity';
import { SqlRepositoryBase } from '@shared/db/sql-repository.base';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const userSchema = z.object({
  id: z.string(),
  createdAt: z.union([z.string(), z.date(), z.number()]).transform(val => {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return new Date(val).toISOString();
    return val.toISOString();
  }),
  updatedAt: z.union([z.string(), z.date(), z.number()]).transform(val => {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return new Date(val).toISOString();
    return val.toISOString();
  }),
  email: z.string(),
  country: z.union([z.string(), z.null()]).optional(),
  postalCode: z.union([z.string(), z.null()]).optional(),
  street: z.union([z.string(), z.null()]).optional(),
  role: z.union([z.string(), z.null()]).optional(),
});

export type UserModel = z.infer<typeof userSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort {
  protected tableName = 'users';

  protected schema = userSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: UserMapper,
    eventEmitter: EventEmitter2,
    logger: Logger,
  ) {
    super(pool, mapper, eventEmitter, logger);
  }

  async findAll(): Promise<UserEntity[]> {
    const statement = sql.type(userSchema)`
      SELECT * FROM "users"
    `;

    const result = await this.pool.query(statement);

    return result.rows.map((row) => this.mapper.toDomain(row));
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.pool.maybeOne(sql`
      SELECT * FROM users WHERE email = ${email}
    `);

    return user ? this.mapper.toDomain(user) : null;
  }

  async updateAddress(user: UserEntity): Promise<void> {
    const userProps = user.getProps();

    await this.pool.query(sql`
      UPDATE users 
      SET 
        country = ${userProps.address?.country || null},
        postal_code = ${userProps.address?.postalCode || null},
        street = ${userProps.address?.street || null},
        updated_at = NOW()
      WHERE id = ${userProps.id}
    `);
  }
}

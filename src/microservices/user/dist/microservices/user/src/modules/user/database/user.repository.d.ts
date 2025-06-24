import { DatabasePool } from 'slonik';
import { UserRepositoryPort } from './user.repository.port';
import { z } from 'zod';
import { UserMapper } from '../user.mapper';
import { UserRoles } from '../domain/user.types';
import { UserEntity } from '../domain/user.entity';
import { SqlRepositoryBase } from '@shared/db/sql-repository.base';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    email: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    street: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRoles>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    email?: string;
    country?: string;
    postalCode?: string;
    street?: string;
    role?: UserRoles;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    email?: string;
    country?: string;
    postalCode?: string;
    street?: string;
    role?: UserRoles;
}>;
export type UserModel = z.TypeOf<typeof userSchema>;
export declare class UserRepository extends SqlRepositoryBase<UserEntity, UserModel> implements UserRepositoryPort {
    protected tableName: string;
    protected schema: z.ZodObject<{
        id: z.ZodString;
        createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
        updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
        email: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodString;
        street: z.ZodString;
        role: z.ZodNativeEnum<typeof UserRoles>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
        email?: string;
        country?: string;
        postalCode?: string;
        street?: string;
        role?: UserRoles;
    }, {
        id?: string;
        createdAt?: unknown;
        updatedAt?: unknown;
        email?: string;
        country?: string;
        postalCode?: string;
        street?: string;
        role?: UserRoles;
    }>;
    constructor(pool: DatabasePool, mapper: UserMapper, eventEmitter: EventEmitter2);
    updateAddress(user: UserEntity): Promise<void>;
    findOneByEmail(email: string): Promise<UserEntity>;
}

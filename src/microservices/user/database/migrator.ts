import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export async function getUserMigrator() {
    const pool = await createPool(
        `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    );

    const migrator = new SlonikMigrator({
        migrationsPath: path.resolve(__dirname, 'migrations'),
        migrationTableName: 'user_migrations',
        slonik: pool,
    } as any);

    return { pool, migrator };
}

export async function runUserMigrations() {
    const { migrator } = await getUserMigrator();
    await migrator.up();
    console.log('User migrations completed');
}

export async function seedUserData() {
    const { pool } = await getUserMigrator();
    const seedData = require('fs').readFileSync(
        path.resolve(__dirname, 'seeds', 'users.seed.sql'),
        'utf8'
    );

    await pool.query({ sql: seedData, values: [], type: 'SLONIK_TOKEN_SQL' });
    console.log('User seed data inserted');
}

if (require.main === module) {
    runUserMigrations()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
} 
import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export async function getWalletMigrator() {
    const pool = await createPool(
        `postgres://${process.env.WALLET_DB_USERNAME}:${process.env.WALLET_DB_PASSWORD}@${process.env.WALLET_DB_HOST}:${process.env.WALLET_DB_PORT}/${process.env.WALLET_DB_NAME}`,
    );

    const migrator = new SlonikMigrator({
        migrationsPath: path.resolve(__dirname, 'migrations'),
        migrationTableName: 'wallet_migrations',
        slonik: pool,
    } as any);

    return { pool, migrator };
}

export async function runWalletMigrations() {
    const { migrator } = await getWalletMigrator();
    await migrator.up();
    console.log('Wallet migrations completed');
}

export async function seedWalletData() {
    const { pool } = await getWalletMigrator();
    const seedData = require('fs').readFileSync(
        path.resolve(__dirname, 'seeds', 'wallets.seed.sql'),
        'utf8'
    );

    await pool.query({ sql: seedData, values: [], type: 'SLONIK_TOKEN_SQL' });
    console.log('Wallet seed data inserted');
}

if (require.main === module) {
    runWalletMigrations()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
} 
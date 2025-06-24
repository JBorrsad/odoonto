import { Module } from '@nestjs/common';
import { SlonikModule } from 'nestjs-slonik';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(__dirname, '..', '.env'),
        }),
        SlonikModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dbUsername = configService.get('DB_USERNAME') || 'postgres';
                const dbPassword = configService.get('DB_PASSWORD') || 'postgres123';
                const dbHost = configService.get('DB_HOST') || 'localhost';
                const dbPort = configService.get('DB_PORT') || '5432';
                const dbName = configService.get('DB_NAME') || 'odoonto';

                const connectionUri = `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
                console.log('🔍 DEBUG - Environment variables:', {
                    dbUsername,
                    dbPassword,
                    dbHost,
                    dbPort,
                    dbName,
                    connectionUri
                });

                return {
                    connectionUri,
                    interceptors: [],
                };
            },
        }),
    ],
    exports: [SlonikModule],
})
export class DatabaseModule { } 
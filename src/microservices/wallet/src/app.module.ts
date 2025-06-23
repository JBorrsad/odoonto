import { Module } from '@nestjs/common';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
    imports: [WalletModule],
})
export class AppModule { } 
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WalletModule } from './wallet.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(WalletModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: 'wallet',
      queueOptions: { durable: true },
    },
  });

  await app.listen();
}
bootstrap();

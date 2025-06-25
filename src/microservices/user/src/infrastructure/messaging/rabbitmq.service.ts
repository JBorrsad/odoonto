import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
    private readonly logger = new Logger(RabbitMQService.name);
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.USER_RMQ_URL || 'amqp://admin:admin@localhost:5672'],
                queue: 'user_queue',
                queueOptions: { durable: true },
            },
        });
    }

    async onModuleInit(): Promise<void> {
        try {
            await this.client.connect();
            this.logger.log('🐰 RabbitMQ client connected successfully');
        } catch (error) {
            this.logger.error('❌ Failed to connect to RabbitMQ:', error);
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.client.close();
        this.logger.log('🔌 RabbitMQ client disconnected');
    }

    /**
 * Envía un evento a otros microservicios
 */
    async publishEvent(pattern: string, data: Record<string, unknown>): Promise<void> {
        try {
            this.logger.log(`📤 Publishing event: ${pattern}`);
            this.client.emit(pattern, data);
        } catch (error) {
            this.logger.error(`❌ Failed to publish event ${pattern}:`, error);
            throw error;
        }
    }

    /**
     * Envía un mensaje y espera respuesta
     */
    async sendMessage<T>(pattern: string, data: Record<string, unknown>): Promise<T> {
        try {
            this.logger.log(`📨 Sending message: ${pattern}`);
            return await this.client.send<T>(pattern, data).toPromise();
        } catch (error) {
            this.logger.error(`❌ Failed to send message ${pattern}:`, error);
            throw error;
        }
    }
} 
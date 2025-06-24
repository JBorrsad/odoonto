import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerPort } from '@shared/ports/logger.port';
export declare abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
    publishEvents(logger: LoggerPort, eventEmitter: EventEmitter2): Promise<void>;
}

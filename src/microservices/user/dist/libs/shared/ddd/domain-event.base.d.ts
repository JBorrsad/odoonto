type DomainEventMetadata = {
    readonly timestamp: number;
    readonly correlationId: string;
    readonly causationId?: string;
    readonly userId?: string;
};
export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
    aggregateId: string;
    metadata?: DomainEventMetadata;
};
export declare abstract class DomainEvent {
    readonly id: string;
    readonly aggregateId: string;
    readonly metadata: DomainEventMetadata;
    constructor(props: DomainEventProps<unknown>);
}
export {};

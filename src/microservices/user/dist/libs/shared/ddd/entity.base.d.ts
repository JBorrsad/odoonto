export type AggregateID = string;
export interface BaseEntityProps {
    id: AggregateID;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateEntityProps<T> {
    id: AggregateID;
    props: T;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare abstract class Entity<EntityProps> {
    constructor({ id, createdAt, updatedAt, props, }: CreateEntityProps<EntityProps>);
    protected readonly props: EntityProps;
    protected abstract _id: AggregateID;
    private readonly _createdAt;
    private _updatedAt;
    get id(): AggregateID;
    private setId;
    get createdAt(): Date;
    get updatedAt(): Date;
    static isEntity(entity: unknown): entity is Entity<unknown>;
    equals(object?: Entity<EntityProps>): boolean;
    getProps(): EntityProps & BaseEntityProps;
    toObject(): unknown;
    abstract validate(): void;
    private validateProps;
}

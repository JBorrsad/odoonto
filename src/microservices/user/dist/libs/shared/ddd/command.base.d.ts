export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;
type CommandMetadata = {
    readonly correlationId: string;
    readonly causationId?: string;
    readonly userId?: string;
    readonly timestamp: number;
};
export declare class Command {
    readonly id: string;
    readonly metadata: CommandMetadata;
    constructor(props: CommandProps<unknown>);
}
export {};

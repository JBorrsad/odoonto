import { RequestContext } from 'nestjs-request-context';
import { DatabaseTransactionConnection } from 'slonik';
export declare class AppRequestContext extends RequestContext {
    requestId: string;
    transactionConnection?: DatabaseTransactionConnection;
}
export declare class RequestContextService {
    static getContext(): AppRequestContext;
    static setRequestId(id: string): void;
    static getRequestId(): string;
    static getTransactionConnection(): DatabaseTransactionConnection | undefined;
    static setTransactionConnection(transactionConnection?: DatabaseTransactionConnection): void;
    static cleanTransactionConnection(): void;
}

export declare class ApiErrorResponse {
    readonly statusCode: number;
    readonly message: string;
    readonly error: string;
    readonly correlationId: string;
    readonly subErrors?: string[];
    constructor(body: ApiErrorResponse);
}

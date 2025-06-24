import { ExceptionBase } from '@shared/exceptions';
export declare class UserAlreadyExistsError extends ExceptionBase {
    static readonly message = "User already exists";
    readonly code = "USER.ALREADY_EXISTS";
    constructor(cause?: Error, metadata?: unknown);
}

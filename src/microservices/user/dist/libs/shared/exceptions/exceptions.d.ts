import { ExceptionBase } from './exception.base';
export declare class ArgumentInvalidException extends ExceptionBase {
    readonly code = "GENERIC.ARGUMENT_INVALID";
}
export declare class ArgumentNotProvidedException extends ExceptionBase {
    readonly code = "GENERIC.ARGUMENT_NOT_PROVIDED";
}
export declare class ArgumentOutOfRangeException extends ExceptionBase {
    readonly code = "GENERIC.ARGUMENT_OUT_OF_RANGE";
}
export declare class ConflictException extends ExceptionBase {
    readonly code = "GENERIC.CONFLICT";
}
export declare class NotFoundException extends ExceptionBase {
    static readonly message = "Not found";
    constructor(message?: string);
    readonly code = "GENERIC.NOT_FOUND";
}
export declare class InternalServerErrorException extends ExceptionBase {
    static readonly message = "Internal server error";
    constructor(message?: string);
    readonly code = "GENERIC.INTERNAL_SERVER_ERROR";
}

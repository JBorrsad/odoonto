"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionBase = void 0;
const AppRequestContext_1 = require("../application/context/AppRequestContext");
class ExceptionBase extends Error {
    constructor(message, cause, metadata) {
        super(message);
        this.message = message;
        this.cause = cause;
        this.metadata = metadata;
        Error.captureStackTrace(this, this.constructor);
        const ctx = AppRequestContext_1.RequestContextService.getContext();
        this.correlationId = ctx.requestId;
    }
    toJSON() {
        return {
            message: this.message,
            code: this.code,
            stack: this.stack,
            correlationId: this.correlationId,
            cause: JSON.stringify(this.cause),
            metadata: this.metadata,
        };
    }
}
exports.ExceptionBase = ExceptionBase;
//# sourceMappingURL=exception.base.js.map
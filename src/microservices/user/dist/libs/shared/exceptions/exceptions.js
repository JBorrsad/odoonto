"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.NotFoundException = exports.ConflictException = exports.ArgumentOutOfRangeException = exports.ArgumentNotProvidedException = exports.ArgumentInvalidException = void 0;
const _1 = require(".");
const exception_base_1 = require("./exception.base");
class ArgumentInvalidException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = _1.ARGUMENT_INVALID;
    }
}
exports.ArgumentInvalidException = ArgumentInvalidException;
class ArgumentNotProvidedException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = _1.ARGUMENT_NOT_PROVIDED;
    }
}
exports.ArgumentNotProvidedException = ArgumentNotProvidedException;
class ArgumentOutOfRangeException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = _1.ARGUMENT_OUT_OF_RANGE;
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
class ConflictException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = _1.CONFLICT;
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends exception_base_1.ExceptionBase {
    constructor(message = NotFoundException.message) {
        super(message);
        this.code = _1.NOT_FOUND;
    }
}
exports.NotFoundException = NotFoundException;
NotFoundException.message = 'Not found';
class InternalServerErrorException extends exception_base_1.ExceptionBase {
    constructor(message = InternalServerErrorException.message) {
        super(message);
        this.code = _1.INTERNAL_SERVER_ERROR;
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
InternalServerErrorException.message = 'Internal server error';
//# sourceMappingURL=exceptions.js.map
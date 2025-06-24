"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const exceptions_1 = require("../../../../../../libs/shared/exceptions");
class UserAlreadyExistsError extends exceptions_1.ExceptionBase {
    constructor(cause, metadata) {
        super(UserAlreadyExistsError.message, cause, metadata);
        this.code = 'USER.ALREADY_EXISTS';
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
UserAlreadyExistsError.message = 'User already exists';
//# sourceMappingURL=user.errors.js.map
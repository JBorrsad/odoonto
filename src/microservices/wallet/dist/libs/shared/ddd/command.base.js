"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const AppRequestContext_1 = require("../application/context/AppRequestContext");
const exceptions_1 = require("../exceptions");
const guard_1 = require("../guard");
const crypto_1 = require("crypto");
class Command {
    constructor(props) {
        if (guard_1.Guard.isEmpty(props)) {
            throw new exceptions_1.ArgumentNotProvidedException('Command props should not be empty');
        }
        const ctx = AppRequestContext_1.RequestContextService.getContext();
        this.id = props.id || (0, crypto_1.randomUUID)();
        this.metadata = {
            correlationId: props?.metadata?.correlationId || ctx.requestId,
            causationId: props?.metadata?.causationId,
            timestamp: props?.metadata?.timestamp || Date.now(),
            userId: props?.metadata?.userId,
        };
    }
}
exports.Command = Command;
//# sourceMappingURL=command.base.js.map
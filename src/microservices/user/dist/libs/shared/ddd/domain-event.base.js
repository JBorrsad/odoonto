"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const crypto_1 = require("crypto");
const exceptions_1 = require("../exceptions");
const guard_1 = require("../guard");
const AppRequestContext_1 = require("../application/context/AppRequestContext");
class DomainEvent {
    constructor(props) {
        if (guard_1.Guard.isEmpty(props)) {
            throw new exceptions_1.ArgumentNotProvidedException('DomainEvent props should not be empty');
        }
        this.id = (0, crypto_1.randomUUID)();
        this.aggregateId = props.aggregateId;
        this.metadata = {
            correlationId: props?.metadata?.correlationId || AppRequestContext_1.RequestContextService.getRequestId(),
            causationId: props?.metadata?.causationId,
            timestamp: props?.metadata?.timestamp || Date.now(),
            userId: props?.metadata?.userId,
        };
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain-event.base.js.map
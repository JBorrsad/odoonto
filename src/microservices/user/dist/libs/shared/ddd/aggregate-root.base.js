"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const entity_base_1 = require("./entity.base");
const AppRequestContext_1 = require("../application/context/AppRequestContext");
class AggregateRoot extends entity_base_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    clearEvents() {
        this._domainEvents = [];
    }
    async publishEvents(logger, eventEmitter) {
        await Promise.all(this.domainEvents.map(async (event) => {
            logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] "${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`);
            return eventEmitter.emitAsync(event.constructor.name, event);
        }));
        this.clearEvents();
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.base.js.map
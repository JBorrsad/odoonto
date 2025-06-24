"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedDomainEvent = void 0;
const ddd_1 = require("../ddd");
class UserCreatedDomainEvent extends ddd_1.DomainEvent {
    constructor(props) {
        super(props);
        this.email = props.email;
        this.country = props.country;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
}
exports.UserCreatedDomainEvent = UserCreatedDomainEvent;
//# sourceMappingURL=user-created.domain-event.js.map
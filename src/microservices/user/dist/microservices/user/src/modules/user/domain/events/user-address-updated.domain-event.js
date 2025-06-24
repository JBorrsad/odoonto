"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressUpdatedDomainEvent = void 0;
const ddd_1 = require("../../../../../../../libs/shared/ddd");
class UserAddressUpdatedDomainEvent extends ddd_1.DomainEvent {
    constructor(props) {
        super(props);
        this.country = props.country;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
}
exports.UserAddressUpdatedDomainEvent = UserAddressUpdatedDomainEvent;
//# sourceMappingURL=user-address-updated.domain-event.js.map
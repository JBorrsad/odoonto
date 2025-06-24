"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleChangedDomainEvent = void 0;
const ddd_1 = require("../../../../../../../libs/shared/ddd");
class UserRoleChangedDomainEvent extends ddd_1.DomainEvent {
    constructor(props) {
        super(props);
        this.oldRole = props.oldRole;
        this.newRole = props.newRole;
    }
}
exports.UserRoleChangedDomainEvent = UserRoleChangedDomainEvent;
//# sourceMappingURL=user-role-changed.domain-event.js.map
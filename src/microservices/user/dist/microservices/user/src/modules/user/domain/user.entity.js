"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const ddd_1 = require("../../../../../../libs/shared/ddd");
const user_created_domain_event_1 = require("./events/user-created.domain-event");
const address_value_object_1 = require("./value-objects/address.value-object");
const user_types_1 = require("./user.types");
const user_deleted_domain_event_1 = require("./events/user-deleted.domain-event");
const user_role_changed_domain_event_1 = require("./events/user-role-changed.domain-event");
const user_address_updated_domain_event_1 = require("./events/user-address-updated.domain-event");
const crypto_1 = require("crypto");
class UserEntity extends ddd_1.AggregateRoot {
    static create(create) {
        const id = (0, crypto_1.randomUUID)();
        const props = { ...create, role: user_types_1.UserRoles.guest };
        const user = new UserEntity({ id, props });
        user.addEvent(new user_created_domain_event_1.UserCreatedDomainEvent({
            aggregateId: id,
            email: props.email,
            ...props.address.unpack(),
        }));
        return user;
    }
    get role() {
        return this.props.role;
    }
    changeRole(newRole) {
        this.addEvent(new user_role_changed_domain_event_1.UserRoleChangedDomainEvent({
            aggregateId: this.id,
            oldRole: this.props.role,
            newRole,
        }));
        this.props.role = newRole;
    }
    makeAdmin() {
        this.changeRole(user_types_1.UserRoles.admin);
    }
    makeModerator() {
        this.changeRole(user_types_1.UserRoles.moderator);
    }
    delete() {
        this.addEvent(new user_deleted_domain_event_1.UserDeletedDomainEvent({
            aggregateId: this.id,
        }));
    }
    updateAddress(props) {
        const newAddress = new address_value_object_1.Address({
            ...this.props.address,
            ...props,
        });
        this.props.address = newAddress;
        this.addEvent(new user_address_updated_domain_event_1.UserAddressUpdatedDomainEvent({
            aggregateId: this.id,
            country: newAddress.country,
            street: newAddress.street,
            postalCode: newAddress.postalCode,
        }));
    }
    validate() {
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map
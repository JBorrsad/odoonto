"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const ddd_1 = require("../../../../../../../libs/shared/ddd");
const guard_1 = require("../../../../../../../libs/shared/guard");
const exceptions_1 = require("../../../../../../../libs/shared/exceptions");
class Address extends ddd_1.ValueObject {
    get country() {
        return this.props.country;
    }
    get postalCode() {
        return this.props.postalCode;
    }
    get street() {
        return this.props.street;
    }
    validate(props) {
        if (!guard_1.Guard.lengthIsBetween(props.country, 2, 50)) {
            throw new exceptions_1.ArgumentOutOfRangeException('country is out of range');
        }
        if (!guard_1.Guard.lengthIsBetween(props.street, 2, 50)) {
            throw new exceptions_1.ArgumentOutOfRangeException('street is out of range');
        }
        if (!guard_1.Guard.lengthIsBetween(props.postalCode, 2, 10)) {
            throw new exceptions_1.ArgumentOutOfRangeException('postalCode is out of range');
        }
    }
}
exports.Address = Address;
//# sourceMappingURL=address.value-object.js.map
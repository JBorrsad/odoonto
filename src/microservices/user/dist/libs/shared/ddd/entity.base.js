"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const exceptions_1 = require("../exceptions");
const guard_1 = require("../guard");
const utils_1 = require("../utils");
class Entity {
    constructor({ id, createdAt, updatedAt, props, }) {
        this.setId(id);
        this.validateProps(props);
        const now = new Date();
        this._createdAt = createdAt || now;
        this._updatedAt = updatedAt || now;
        this.props = props;
        this.validate();
    }
    get id() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    static isEntity(entity) {
        return entity instanceof Entity;
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!Entity.isEntity(object)) {
            return false;
        }
        return this.id ? this.id === object.id : false;
    }
    getProps() {
        const propsCopy = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...this.props,
        };
        return Object.freeze(propsCopy);
    }
    toObject() {
        const plainProps = (0, utils_1.convertPropsToObject)(this.props);
        const result = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...plainProps,
        };
        return Object.freeze(result);
    }
    validateProps(props) {
        const MAX_PROPS = 50;
        if (guard_1.Guard.isEmpty(props)) {
            throw new exceptions_1.ArgumentNotProvidedException('Entity props should not be empty');
        }
        if (typeof props !== 'object') {
            throw new exceptions_1.ArgumentInvalidException('Entity props should be an object');
        }
        if (Object.keys(props).length > MAX_PROPS) {
            throw new exceptions_1.ArgumentOutOfRangeException(`Entity props should not have more than ${MAX_PROPS} properties`);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.base.js.map
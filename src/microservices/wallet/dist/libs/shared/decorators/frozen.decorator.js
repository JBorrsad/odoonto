"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frozen = frozen;
function frozen(constructor) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}
//# sourceMappingURL=frozen.decorator.js.map
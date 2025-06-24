"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesV1 = void 0;
const usersRoot = 'users';
const walletsRoot = 'wallets';
const v1 = 'v1';
exports.routesV1 = {
    version: v1,
    user: {
        root: usersRoot,
        delete: `/${usersRoot}/:id`,
    },
    wallet: {
        root: walletsRoot,
        delete: `/${walletsRoot}/:id`,
    },
};
//# sourceMappingURL=app.routes.js.map
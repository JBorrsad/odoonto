/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const usersRoot = 'users';
const walletsRoot = 'wallets';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    byId: `/${usersRoot}/:id`,
    delete: `/${usersRoot}/:id`,
  },
  wallet: {
    root: walletsRoot,
    byId: `/${walletsRoot}/:id`,
    delete: `/${walletsRoot}/:id`,
  },
};

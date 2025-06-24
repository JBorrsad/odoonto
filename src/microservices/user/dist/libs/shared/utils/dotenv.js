"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path = require("path");
const envPath = path.resolve(__dirname, process.env.NODE_ENV === 'test' ? '../../../.env.test' : '../../../../.env');
(0, dotenv_1.config)({ path: envPath });
//# sourceMappingURL=dotenv.js.map
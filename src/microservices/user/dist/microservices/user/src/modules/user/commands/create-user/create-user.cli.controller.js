"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCliController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_console_1 = require("nestjs-console");
const cqrs_1 = require("@nestjs/cqrs");
const create_user_command_1 = require("./create-user.command");
let CreateUserCliController = class CreateUserCliController {
    constructor(commandBus, logger) {
        this.commandBus = commandBus;
        this.logger = logger;
    }
    async createUser(email, country, postalCode, street) {
        const command = new create_user_command_1.CreateUserCommand({
            email,
            country,
            postalCode,
            street,
        });
        const result = await this.commandBus.execute(command);
        this.logger.log('User created:', result.unwrap());
    }
};
exports.CreateUserCliController = CreateUserCliController;
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'user <email> <country> <postalCode> <street>',
        description: 'Create a user',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CreateUserCliController.prototype, "createUser", null);
exports.CreateUserCliController = CreateUserCliController = __decorate([
    (0, nestjs_console_1.Console)({
        command: 'new',
        description: 'A command to create a user',
    }),
    __param(1, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, Object])
], CreateUserCliController);
//# sourceMappingURL=create-user.cli.controller.js.map
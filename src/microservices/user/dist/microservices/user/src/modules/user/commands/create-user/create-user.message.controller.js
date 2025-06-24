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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const cqrs_1 = require("@nestjs/cqrs");
const create_user_command_1 = require("./create-user.command");
const create_user_request_dto_1 = require("./create-user.request.dto");
const id_response_dto_1 = require("../../../../../../../libs/shared/api/id.response.dto");
let CreateUserMessageController = class CreateUserMessageController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async create(message) {
        const command = new create_user_command_1.CreateUserCommand(message);
        const id = await this.commandBus.execute(command);
        return new id_response_dto_1.IdResponse(id.unwrap());
    }
};
exports.CreateUserMessageController = CreateUserMessageController;
__decorate([
    (0, microservices_1.MessagePattern)('user.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_dto_1.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], CreateUserMessageController.prototype, "create", null);
exports.CreateUserMessageController = CreateUserMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], CreateUserMessageController);
//# sourceMappingURL=create-user.message.controller.js.map
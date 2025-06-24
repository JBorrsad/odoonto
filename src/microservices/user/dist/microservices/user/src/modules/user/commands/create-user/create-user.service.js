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
exports.CreateUserService = void 0;
const address_value_object_1 = require("../../domain/value-objects/address.value-object");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const create_user_command_1 = require("./create-user.command");
const user_errors_1 = require("../../domain/user.errors");
const user_entity_1 = require("../../domain/user.entity");
const exceptions_1 = require("../../../../../../../libs/shared/exceptions");
const common_1 = require("@nestjs/common");
const user_di_tokens_1 = require("../../user.di-tokens");
let CreateUserService = class CreateUserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(command) {
        const user = user_entity_1.UserEntity.create({
            email: command.email,
            address: new address_value_object_1.Address({
                country: command.country,
                postalCode: command.postalCode,
                street: command.street,
            }),
        });
        try {
            await this.userRepo.transaction(async () => this.userRepo.insert(user));
            return (0, oxide_ts_1.Ok)(user.id);
        }
        catch (error) {
            if (error instanceof exceptions_1.ConflictException) {
                return (0, oxide_ts_1.Err)(new user_errors_1.UserAlreadyExistsError(error));
            }
            throw error;
        }
    }
};
exports.CreateUserService = CreateUserService;
exports.CreateUserService = CreateUserService = __decorate([
    (0, cqrs_1.CommandHandler)(create_user_command_1.CreateUserCommand),
    __param(0, (0, common_1.Inject)(user_di_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateUserService);
//# sourceMappingURL=create-user.service.js.map
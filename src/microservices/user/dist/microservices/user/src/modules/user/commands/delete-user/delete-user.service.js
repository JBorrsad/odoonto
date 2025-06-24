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
exports.DeleteUserService = exports.DeleteUserCommand = void 0;
const exceptions_1 = require("../../../../../../../libs/shared/exceptions");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const user_di_tokens_1 = require("../../user.di-tokens");
class DeleteUserCommand {
    constructor(props) {
        this.userId = props.userId;
    }
}
exports.DeleteUserCommand = DeleteUserCommand;
let DeleteUserService = class DeleteUserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(command) {
        const found = await this.userRepo.findOneById(command.userId);
        if (found.isNone())
            return (0, oxide_ts_1.Err)(new exceptions_1.NotFoundException());
        const user = found.unwrap();
        user.delete();
        const result = await this.userRepo.delete(user);
        return (0, oxide_ts_1.Ok)(result);
    }
};
exports.DeleteUserService = DeleteUserService;
exports.DeleteUserService = DeleteUserService = __decorate([
    (0, cqrs_1.CommandHandler)(DeleteUserCommand),
    __param(0, (0, common_1.Inject)(user_di_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteUserService);
//# sourceMappingURL=delete-user.service.js.map
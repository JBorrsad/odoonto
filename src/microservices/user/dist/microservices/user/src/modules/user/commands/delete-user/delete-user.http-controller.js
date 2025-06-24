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
exports.DeleteUserHttpController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../../../../../libs/config/app.routes");
const cqrs_1 = require("@nestjs/cqrs");
const delete_user_service_1 = require("./delete-user.service");
const oxide_ts_1 = require("oxide.ts");
const exceptions_1 = require("../../../../../../../libs/shared/exceptions");
const swagger_1 = require("@nestjs/swagger");
const api_error_response_1 = require("../../../../../../../libs/shared/api/api-error.response");
let DeleteUserHttpController = class DeleteUserHttpController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async deleteUser(id) {
        const command = new delete_user_service_1.DeleteUserCommand({ userId: id });
        const result = await this.commandBus.execute(command);
        (0, oxide_ts_1.match)(result, {
            Ok: (isOk) => isOk,
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                throw error;
            },
        });
    }
};
exports.DeleteUserHttpController = DeleteUserHttpController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({
        description: 'User deleted',
        status: common_1.HttpStatus.OK,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: exceptions_1.NotFoundException.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Delete)(app_routes_1.routesV1.user.delete),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeleteUserHttpController.prototype, "deleteUser", null);
exports.DeleteUserHttpController = DeleteUserHttpController = __decorate([
    (0, common_1.Controller)(app_routes_1.routesV1.version),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], DeleteUserHttpController);
//# sourceMappingURL=delete-user.http-controller.js.map
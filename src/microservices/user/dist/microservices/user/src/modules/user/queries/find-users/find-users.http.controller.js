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
exports.FindUsersHttpController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../../../../../libs/config/app.routes");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const find_users_request_dto_1 = require("./find-users.request.dto");
const find_users_query_handler_1 = require("./find-users.query-handler");
const user_paginated_response_dto_1 = require("../../dtos/user.paginated.response.dto");
const paginated_query_request_dto_1 = require("../../../../../../../libs/shared/api/paginated-query.request.dto");
const response_base_1 = require("../../../../../../../libs/shared/api/response.base");
let FindUsersHttpController = class FindUsersHttpController {
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    async findUsers(request, queryParams) {
        const query = new find_users_query_handler_1.FindUsersQuery({
            ...request,
            limit: queryParams?.limit,
            page: queryParams?.page,
        });
        const result = await this.queryBus.execute(query);
        const paginated = result.unwrap();
        return new user_paginated_response_dto_1.UserPaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((user) => ({
                ...new response_base_1.ResponseBase({
                    id: user.id,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }),
                email: user.email,
                country: user.country,
                street: user.street,
                postalCode: user.postalCode,
            })),
        });
    }
};
exports.FindUsersHttpController = FindUsersHttpController;
__decorate([
    (0, common_1.Get)(app_routes_1.routesV1.user.root),
    (0, swagger_1.ApiOperation)({ summary: 'Find users' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: user_paginated_response_dto_1.UserPaginatedResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_users_request_dto_1.FindUsersRequestDto,
        paginated_query_request_dto_1.PaginatedQueryRequestDto]),
    __metadata("design:returntype", Promise)
], FindUsersHttpController.prototype, "findUsers", null);
exports.FindUsersHttpController = FindUsersHttpController = __decorate([
    (0, common_1.Controller)(app_routes_1.routesV1.version),
    __metadata("design:paramtypes", [cqrs_1.QueryBus])
], FindUsersHttpController);
//# sourceMappingURL=find-users.http.controller.js.map
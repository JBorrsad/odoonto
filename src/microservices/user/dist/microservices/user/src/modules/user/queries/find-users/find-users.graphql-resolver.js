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
exports.FindUsersGraphqlResolver = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const graphql_1 = require("@nestjs/graphql");
const response_base_1 = require("../../../../../../../libs/shared/api/response.base");
const user_paginated_gql_response_dto_1 = require("../../dtos/graphql/user.paginated-gql-response.dto");
const find_users_query_handler_1 = require("./find-users.query-handler");
let FindUsersGraphqlResolver = class FindUsersGraphqlResolver {
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    async findUsers(options) {
        const query = new find_users_query_handler_1.FindUsersQuery(options);
        const result = await this.queryBus.execute(query);
        const paginated = result.unwrap();
        const response = new user_paginated_gql_response_dto_1.UserPaginatedGraphqlResponseDto({
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
        return response;
    }
};
exports.FindUsersGraphqlResolver = FindUsersGraphqlResolver;
__decorate([
    (0, graphql_1.Query)(() => user_paginated_gql_response_dto_1.UserPaginatedGraphqlResponseDto),
    __param(0, (0, graphql_1.Args)('options', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FindUsersGraphqlResolver.prototype, "findUsers", null);
exports.FindUsersGraphqlResolver = FindUsersGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus])
], FindUsersGraphqlResolver);
//# sourceMappingURL=find-users.graphql-resolver.js.map
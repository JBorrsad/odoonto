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
exports.CreateUserGraphqlResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cqrs_1 = require("@nestjs/cqrs");
const create_user_command_1 = require("../create-user.command");
const create_user_gql_request_dto_1 = require("./dtos/create-user.gql-request.dto");
const id_gql_response_dto_1 = require("./dtos/id.gql-response.dto");
let CreateUserGraphqlResolver = class CreateUserGraphqlResolver {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async create(input) {
        const command = new create_user_command_1.CreateUserCommand(input);
        const id = await this.commandBus.execute(command);
        return new id_gql_response_dto_1.IdGqlResponse(id.unwrap());
    }
};
exports.CreateUserGraphqlResolver = CreateUserGraphqlResolver;
__decorate([
    (0, graphql_1.Mutation)(() => id_gql_response_dto_1.IdGqlResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_gql_request_dto_1.CreateUserGqlRequestDto]),
    __metadata("design:returntype", Promise)
], CreateUserGraphqlResolver.prototype, "create", null);
exports.CreateUserGraphqlResolver = CreateUserGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], CreateUserGraphqlResolver);
//# sourceMappingURL=create-user.graphql-resolver.js.map
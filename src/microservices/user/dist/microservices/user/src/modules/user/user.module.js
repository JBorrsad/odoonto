"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./database/user.repository");
const create_user_http_controller_1 = require("./commands/create-user/create-user.http.controller");
const delete_user_http_controller_1 = require("./commands/delete-user/delete-user.http-controller");
const create_user_cli_controller_1 = require("./commands/create-user/create-user.cli.controller");
const find_users_http_controller_1 = require("./queries/find-users/find-users.http.controller");
const create_user_message_controller_1 = require("./commands/create-user/create-user.message.controller");
const create_user_graphql_resolver_1 = require("./commands/create-user/graphql-example/create-user.graphql-resolver");
const create_user_service_1 = require("./commands/create-user/create-user.service");
const delete_user_service_1 = require("./commands/delete-user/delete-user.service");
const find_users_query_handler_1 = require("./queries/find-users/find-users.query-handler");
const user_mapper_1 = require("./user.mapper");
const cqrs_1 = require("@nestjs/cqrs");
const user_di_tokens_1 = require("./user.di-tokens");
const find_users_graphql_resolver_1 = require("./queries/find-users/find-users.graphql-resolver");
const httpControllers = [
    create_user_http_controller_1.CreateUserHttpController,
    delete_user_http_controller_1.DeleteUserHttpController,
    find_users_http_controller_1.FindUsersHttpController,
];
const messageControllers = [create_user_message_controller_1.CreateUserMessageController];
const cliControllers = [create_user_cli_controller_1.CreateUserCliController];
const graphqlResolvers = [
    create_user_graphql_resolver_1.CreateUserGraphqlResolver,
    find_users_graphql_resolver_1.FindUsersGraphqlResolver,
];
const commandHandlers = [create_user_service_1.CreateUserService, delete_user_service_1.DeleteUserService];
const queryHandlers = [find_users_query_handler_1.FindUsersQueryHandler];
const mappers = [user_mapper_1.UserMapper];
const repositories = [
    { provide: user_di_tokens_1.USER_REPOSITORY, useClass: user_repository_1.UserRepository },
];
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        controllers: [...httpControllers, ...messageControllers],
        providers: [
            common_1.Logger,
            ...cliControllers,
            ...repositories,
            ...graphqlResolvers,
            ...commandHandlers,
            ...queryHandlers,
            ...mappers,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
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
exports.UserGraphqlResponseDto = void 0;
const response_base_1 = require("../../../../../../../libs/shared/api/response.base");
const graphql_1 = require("@nestjs/graphql");
let UserGraphqlResponseDto = class UserGraphqlResponseDto extends response_base_1.ResponseBase {
};
exports.UserGraphqlResponseDto = UserGraphqlResponseDto;
__decorate([
    (0, graphql_1.Field)({
        description: "User's identifier",
    }),
    __metadata("design:type", String)
], UserGraphqlResponseDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "User's email address",
    }),
    __metadata("design:type", String)
], UserGraphqlResponseDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "User's country of residence",
    }),
    __metadata("design:type", String)
], UserGraphqlResponseDto.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Postal code',
    }),
    __metadata("design:type", String)
], UserGraphqlResponseDto.prototype, "postalCode", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Street where the user is registered',
    }),
    __metadata("design:type", String)
], UserGraphqlResponseDto.prototype, "street", void 0);
exports.UserGraphqlResponseDto = UserGraphqlResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], UserGraphqlResponseDto);
//# sourceMappingURL=user.graphql-response.dto.js.map
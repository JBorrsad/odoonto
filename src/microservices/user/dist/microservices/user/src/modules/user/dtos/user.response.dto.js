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
exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../../../../libs/shared/api/response.base");
class UserResponseDto extends response_base_1.ResponseBase {
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'joh-doe@gmail.com',
        description: "User's email address",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'France',
        description: "User's country of residence",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'Postal code',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Park Avenue',
        description: 'Street where the user is registered',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "street", void 0);
//# sourceMappingURL=user.response.dto.js.map
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
exports.FindUsersRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindUsersRequestDto {
}
exports.FindUsersRequestDto = FindUsersRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'France', description: 'Country of residence' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z ]*$/),
    __metadata("design:type", String)
], FindUsersRequestDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '28566', description: 'Postal code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], FindUsersRequestDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Grande Rue', description: 'Street' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z ]*$/),
    __metadata("design:type", String)
], FindUsersRequestDto.prototype, "street", void 0);
//# sourceMappingURL=find-users.request.dto.js.map
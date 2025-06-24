"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_repository_1 = require("./database/user.repository");
const address_value_object_1 = require("./domain/value-objects/address.value-object");
const user_entity_1 = require("./domain/user.entity");
const user_response_dto_1 = require("./dtos/user.response.dto");
const common_1 = require("@nestjs/common");
let UserMapper = class UserMapper {
    toPersistence(entity) {
        const copy = entity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            email: copy.email,
            country: copy.address.country,
            postalCode: copy.address.postalCode,
            street: copy.address.street,
            role: copy.role,
        };
        return user_repository_1.userSchema.parse(record);
    }
    toDomain(record) {
        const entity = new user_entity_1.UserEntity({
            id: record.id,
            createdAt: new Date(record.createdAt),
            updatedAt: new Date(record.updatedAt),
            props: {
                email: record.email,
                role: record.role,
                address: new address_value_object_1.Address({
                    street: record.street,
                    postalCode: record.postalCode,
                    country: record.country,
                }),
            },
        });
        return entity;
    }
    toResponse(entity) {
        const props = entity.getProps();
        const response = new user_response_dto_1.UserResponseDto(entity);
        response.email = props.email;
        response.country = props.address.country;
        response.postalCode = props.address.postalCode;
        response.street = props.address.street;
        return response;
    }
};
exports.UserMapper = UserMapper;
exports.UserMapper = UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
//# sourceMappingURL=user.mapper.js.map
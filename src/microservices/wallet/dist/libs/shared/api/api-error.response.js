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
exports.ApiErrorResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiErrorResponse {
    constructor(body) {
        this.statusCode = body.statusCode;
        this.message = body.message;
        this.error = body.error;
        this.correlationId = body.correlationId;
        this.subErrors = body.subErrors;
    }
}
exports.ApiErrorResponse = ApiErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 400 }),
    __metadata("design:type", Number)
], ApiErrorResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Validation Error' }),
    __metadata("design:type", String)
], ApiErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bad Request' }),
    __metadata("design:type", String)
], ApiErrorResponse.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'YevPQs' }),
    __metadata("design:type", String)
], ApiErrorResponse.prototype, "correlationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['incorrect email'],
        description: 'Optional list of sub-errors',
        nullable: true,
        required: false,
    }),
    __metadata("design:type", Array)
], ApiErrorResponse.prototype, "subErrors", void 0);
//# sourceMappingURL=api-error.response.js.map
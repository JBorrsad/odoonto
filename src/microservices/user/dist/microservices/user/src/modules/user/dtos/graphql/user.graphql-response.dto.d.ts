import { ResponseBase } from '@shared/api/response.base';
export declare class UserGraphqlResponseDto extends ResponseBase {
    id: string;
    email: string;
    country: string;
    postalCode: string;
    street: string;
}

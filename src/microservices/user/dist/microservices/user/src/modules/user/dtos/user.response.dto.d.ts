import { ResponseBase } from '@shared/api/response.base';
export declare class UserResponseDto extends ResponseBase {
  email: string;
  country: string;
  postalCode: string;
  street: string;
}

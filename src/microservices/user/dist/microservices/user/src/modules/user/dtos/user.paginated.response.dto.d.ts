import { PaginatedResponseDto } from '@shared/api/paginated.response.base';
import { UserResponseDto } from './user.response.dto';
export declare class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  readonly data: readonly UserResponseDto[];
}

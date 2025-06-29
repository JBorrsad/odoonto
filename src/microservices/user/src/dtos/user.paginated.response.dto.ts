import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@shared/api/paginated.response.base';
import { UserResponseDto } from './user.response.dto';

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  readonly data: readonly UserResponseDto[];
}

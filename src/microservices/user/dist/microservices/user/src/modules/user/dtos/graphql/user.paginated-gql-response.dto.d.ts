import { IPaginatedType } from '@shared/api/graphql/paginated.graphql-response.base';
import { UserGraphqlResponseDto } from './user.graphql-response.dto';
declare const UserPaginatedGraphqlResponseDto_base: import("@nestjs/common").Type<IPaginatedType<UserGraphqlResponseDto>>;
export declare class UserPaginatedGraphqlResponseDto extends UserPaginatedGraphqlResponseDto_base implements IPaginatedType<UserGraphqlResponseDto> {
    data: UserGraphqlResponseDto[];
}
export {};

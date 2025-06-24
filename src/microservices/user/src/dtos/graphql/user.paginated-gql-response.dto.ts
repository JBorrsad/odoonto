import { Field, ObjectType } from '@nestjs/graphql';
import {
  PaginatedGraphqlResponse,
  IPaginatedType,
} from '@shared/api/graphql/paginated.graphql-response.base';
import { UserGraphqlResponseDto } from './user.graphql-response.dto';

/**
 * GraphQL paginated response for User objects
 */
@ObjectType('UserPaginatedGraphqlResponse')
export class UserPaginatedGraphqlResponseDto
  extends PaginatedGraphqlResponse(UserGraphqlResponseDto)
  implements IPaginatedType<UserGraphqlResponseDto>
{
  @Field(() => [UserGraphqlResponseDto])
  declare data: UserGraphqlResponseDto[];
}

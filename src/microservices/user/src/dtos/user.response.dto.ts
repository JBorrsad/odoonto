import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@shared/api/response.base';
import { UserRoles } from '../domain/user.types';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'guest',
    description: "User's role",
    enum: UserRoles,
  })
  role: UserRoles;

  @ApiProperty({
    example: 'France',
    description: "User's country of residence",
  })
  country: string;

  @ApiProperty({
    example: '123456',
    description: 'Postal code',
  })
  postalCode: string;

  @ApiProperty({
    example: 'Park Avenue',
    description: 'Street where the user is registered',
  })
  street: string;
}

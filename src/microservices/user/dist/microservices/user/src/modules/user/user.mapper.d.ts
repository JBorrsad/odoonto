import { Mapper } from '@shared/ddd';
import { UserModel } from './database/user.repository';
import { UserEntity } from './domain/user.entity';
import { UserResponseDto } from './dtos/user.response.dto';
export declare class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
    toPersistence(entity: UserEntity): UserModel;
    toDomain(record: UserModel): UserEntity;
    toResponse(entity: UserEntity): UserResponseDto;
}

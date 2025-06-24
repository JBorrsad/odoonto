import { AggregateRoot, AggregateID } from '@shared/ddd';
import { CreateUserProps, UpdateUserAddressProps, UserProps, UserRoles } from './user.types';
export declare class UserEntity extends AggregateRoot<UserProps> {
    protected readonly _id: AggregateID;
    static create(create: CreateUserProps): UserEntity;
    get role(): UserRoles;
    private changeRole;
    makeAdmin(): void;
    makeModerator(): void;
    delete(): void;
    updateAddress(props: UpdateUserAddressProps): void;
    validate(): void;
}

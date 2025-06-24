import { Address } from './value-objects/address.value-object';
export interface UserProps {
    role: UserRoles;
    email: string;
    address: Address;
}
export interface CreateUserProps {
    email: string;
    address: Address;
}
export interface UpdateUserAddressProps {
    country?: string;
    postalCode?: string;
    street?: string;
}
export declare enum UserRoles {
    admin = "admin",
    moderator = "moderator",
    guest = "guest"
}

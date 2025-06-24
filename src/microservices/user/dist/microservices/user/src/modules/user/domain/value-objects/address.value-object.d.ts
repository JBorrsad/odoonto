import { ValueObject } from '@shared/ddd';
export interface AddressProps {
    country: string;
    postalCode: string;
    street: string;
}
export declare class Address extends ValueObject<AddressProps> {
    get country(): string;
    get postalCode(): string;
    get street(): string;
    protected validate(props: AddressProps): void;
}

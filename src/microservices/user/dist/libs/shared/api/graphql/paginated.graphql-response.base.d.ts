import { Type } from '@nestjs/common';
export interface IPaginatedType<T> {
    data: T[];
    count: number;
    limit: number;
    page: number;
}
export declare function PaginatedGraphqlResponse<T>(classRef: Type<T>): Type<IPaginatedType<T>>;

import { OrderBy, PaginatedQueryParams } from './repository.port';
export declare abstract class QueryBase {
}
export declare abstract class PaginatedQueryBase extends QueryBase {
    limit: number;
    offset: number;
    orderBy: OrderBy;
    page: number;
    constructor(props: PaginatedParams<PaginatedQueryBase>);
}
export type PaginatedParams<T> = Omit<T, 'limit' | 'offset' | 'orderBy' | 'page'> & Partial<Omit<PaginatedQueryParams, 'offset'>>;

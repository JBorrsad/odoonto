import { Paginated } from '../ddd';
export declare abstract class PaginatedResponseDto<T> extends Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  abstract readonly data: readonly T[];
}

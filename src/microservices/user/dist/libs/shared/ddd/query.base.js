"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedQueryBase = exports.QueryBase = void 0;
class QueryBase {
}
exports.QueryBase = QueryBase;
class PaginatedQueryBase extends QueryBase {
    constructor(props) {
        super();
        this.limit = props.limit || 20;
        this.offset = props.page ? props.page * this.limit : 0;
        this.page = props.page || 0;
        this.orderBy = props.orderBy || { field: true, param: 'desc' };
    }
}
exports.PaginatedQueryBase = PaginatedQueryBase;
//# sourceMappingURL=query.base.js.map
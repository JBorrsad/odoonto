import { IdResponse } from './id.response.dto';
export interface BaseResponseProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ResponseBase extends IdResponse {
    constructor(props: BaseResponseProps);
    readonly createdAt: string;
    readonly updatedAt: string;
}

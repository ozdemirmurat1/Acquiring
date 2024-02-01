export class PaginationResultModel<T>{
    items:T[];
    From:number;
    Index:number;
    Size:number;
    Count:number;
    Pages:number;
    HasPrevious:boolean;
    HasNext:boolean;
}
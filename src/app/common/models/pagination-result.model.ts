export class PaginationResultModel<T>{
    items:T[];
    From:number;
    Index:number;
    Size:number;
    count:number;
    Pages:number;
    HasPrevious:boolean;
    HasNext:boolean;
}
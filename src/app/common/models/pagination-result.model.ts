export class PaginationResultModel<T>{
    Items:T;
    From:number;
    Index:number;
    Size:number;
    Count:number;
    Pages:number;
    HasPrevious:boolean;
    HasNext:boolean;
}
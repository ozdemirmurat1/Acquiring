// error.model.ts
export interface CustomError {
    Property: string;
    Errors:string[];

  }
  
  export interface Errors {
    Errors:CustomError[]
    detail: string;
    instance: string;
    status:number;
    title:string;
    type:string;
  }
  
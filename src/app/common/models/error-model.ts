export class CustomErrorResponse {
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    error: {
      Errors: string[];
      Property: string;
    };
    detail: string;
    instance: any;
    title: string;
    type: string;
}
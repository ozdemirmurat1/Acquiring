import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/directives/services/http-client.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { ChainModel } from '../models/chain.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomError, Errors } from 'src/app/common/models/error-model';
import { CreateChainModel } from '../models/create-chain.model';
import { Observable, firstValueFrom } from 'rxjs';
import { RemoveByIdModel } from 'src/app/common/models/remove-by-id.model';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor(private httpClientService: HttpClientService) { }

  async read(PageIndex: number = 0, PageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ data: PaginationResultModel<ChainModel> }> {
    const promiseData: Promise<{ data: PaginationResultModel<ChainModel> }> = this.httpClientService.get<{ data: PaginationResultModel<ChainModel> }>({
      controller: "Chains/GetList",
      queryString: `PageIndex=${PageIndex}&PageSize=${PageSize}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  create(chain: CreateChainModel, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "chains",
      action: "create"
    }, chain)
      .subscribe(result => {
        successCallBack();
      }, (error: HttpErrorResponse) => {

        let customError: Errors;

        customError = error.error;
        debugger;

        const _error: Array<{ Property: string, Errors: Array<string> }> = customError.Errors;
        let message = "";
        _error.forEach((v, index) => {
          v.Errors.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });

        errorCallBack(message);

      });
  }

  update(chain: ChainModel, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "chains",
      action: "update"
    }, chain)
      .subscribe(result => {
        successCallBack();
      }, (error: HttpErrorResponse) => {

        let customError: Errors;

        customError = error.error;

        const _error: Array<{ Property: string, Errors: Array<string> }> = customError.Errors;
        let message = "";
        _error.forEach((v, index) => {
          v.Errors.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });

        errorCallBack(message);

      });
  }

  async delete(id:string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ data: RemoveByIdModel }> {
    const promiseData: Promise<{ data: RemoveByIdModel }> = this.httpClientService.get<{ data: RemoveByIdModel }>({
      controller: "Chains/Delete",
      queryString: `id=${id}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }


}




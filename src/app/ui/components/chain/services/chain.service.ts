import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/directives/services/http-client.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { ChainModel } from '../models/chain.model';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomError, Errors } from 'src/app/common/models/error-model';
import { CreateChainModel } from '../models/create-chain.model';
import { Observable, firstValueFrom } from 'rxjs';
import { RemoveByIdModel } from 'src/app/common/models/remove-by-id.model';
import { AccesssToken } from '../../auth/services/identity-check.service';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor(private httpClientService: HttpClientService) {
    console.log(AccesssToken)
   }

  async read(PageIndex: number = 0, PageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ data: PaginationResultModel<ChainModel> }> {
    const promiseData: Promise<{ data: PaginationResultModel<ChainModel> }> = this.httpClientService.get<{ data: PaginationResultModel<ChainModel> }>({
      controller: "Chains/GetList",
      queryString: `PageIndex=${PageIndex}&PageSize=${PageSize}`,
      headers: new HttpHeaders({"Authorization":`Bearer ${AccesssToken}`})
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  create(chain: CreateChainModel, successCallBack?: () => void) {
    this.httpClientService.post({
      controller: "chains",
      action: "create",
      headers: new HttpHeaders({"Authorization":`Bearer ${AccesssToken}`})
    }, chain)
      .subscribe(result => {
        successCallBack();
      });
  }

  update(chain: ChainModel, successCallBack?: () => void) {
    this.httpClientService.post({
      controller: "chains",
      action: "update",
      headers: new HttpHeaders({"Authorization":`Bearer ${AccesssToken}`})
    }, chain)
      .subscribe(result => {
        successCallBack();
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




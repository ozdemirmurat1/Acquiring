import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/directives/services/http-client.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { ChainModel } from '../models/chain.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor(private httpClientService: HttpClientService) { }

  async read(PageIndex: number = 0, PageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ data: PaginationResultModel<ChainModel> }> {
    const promiseData: Promise<{data: PaginationResultModel<ChainModel>  }> = this.httpClientService.get<{data: PaginationResultModel<ChainModel> }>({
      controller: "Chains/GetList",
      queryString: `PageIndex=${PageIndex}&PageSize=${PageSize}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}

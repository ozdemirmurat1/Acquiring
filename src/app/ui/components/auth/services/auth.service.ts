import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/common/directives/services/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';
import { LoginResponseModel } from '../models/Login-Response.model';
import { RequestLoginModel } from '../models/Request-Login.model';
import { CryptoService } from 'src/app/common/directives/services/crypto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Errors } from 'src/app/common/models/error-model';
import { AlertifyService, MessageType, Position } from 'src/app/common/directives/services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService,private _crypto:CryptoService,private alertifyService: AlertifyService) { }

  async login(model:RequestLoginModel, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {

    try {
      const observable: Observable<any | LoginResponseModel> = this.httpClientService.post<any | LoginResponseModel>({
        controller: "auth",
        action: "login"
      }, { Email:model.Email,Password:model.Password})
  
      const loginResponseModel: LoginResponseModel = await firstValueFrom(observable) as LoginResponseModel;
      let cryptoAccessTokenValue=this._crypto.encrypto(JSON.stringify(loginResponseModel.accessToken.token))
      let cryptoRefreshTokenValue=this._crypto.encrypto(JSON.stringify(loginResponseModel.refreshTokenDto.token))
  
      if (loginResponseModel) {
        // BURADAKİ ACCESS VE REFRESHTOKEN LARI DEĞER İLE TAŞI İDENETİYCHECK TE KULLAN
        localStorage.setItem("accessToken", cryptoAccessTokenValue);
        localStorage.setItem("refreshToken", cryptoRefreshTokenValue);
        _isAuthenticatedAccessTokenExpire=loginResponseModel.accessToken.expiration;
        _isAuthenticatedRefreshTokenExpire=loginResponseModel.refreshTokenDto.expiration;
  
        this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    } catch (error: any) {

      error:HttpErrorResponse;
      let customError: Errors;

      customError = error.error;
      debugger;

      // const _error: Array<{ Property: string, Errors: Array<string> }> = customError.Errors;
      // let message = "";
      // _error.forEach((v, index) => {
      //   v.Errors.forEach((_v, _index) => {
      //     message += `${_v}<br>`;
      //   });
      // });

      this.alertifyService.message(customError.detail,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    }
   
  }
}

export let _isAuthenticatedAccessTokenExpire: string;
export let _isAuthenticatedRefreshTokenExpire: string;
export let _accessToken:string;
export let _refreshToken:string;

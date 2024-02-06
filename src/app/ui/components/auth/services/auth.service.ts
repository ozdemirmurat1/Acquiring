import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/common/directives/services/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';
import { LoginResponseModel } from '../models/Login-Response.model';
import { RequestLoginModel } from '../models/Request-Login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

  async login(model:RequestLoginModel, callBackFunction?: () => void): Promise<any> {
    debugger;
    const observable: Observable<any | LoginResponseModel> = this.httpClientService.post<any | LoginResponseModel>({
      controller: "auth",
      action: "login"
    }, { Email:model.Email,Password:model.Password})

    const loginResponseModel: LoginResponseModel = await firstValueFrom(observable) as LoginResponseModel;
    debugger;
    if (loginResponseModel) {
      // BURADAKİ ACCESS VE REFRESHTOKEN LARI DEĞER İLE TAŞI İDENETİYCHECK TE KULLAN
      localStorage.setItem("accessToken", loginResponseModel.accessToken.token);
      localStorage.setItem("refreshToken", loginResponseModel.refreshTokenDto.token);
      _isAuthenticatedAccessTokenExpire=loginResponseModel.accessToken.expiration;
      _isAuthenticatedRefreshTokenExpire=loginResponseModel.refreshTokenDto.expiration;

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }

    callBackFunction();
  }
}

export let _isAuthenticatedAccessTokenExpire: string;
export let _isAuthenticatedRefreshTokenExpire: string;

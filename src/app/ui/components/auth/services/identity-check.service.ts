import { Injectable, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';
import { _isAuthenticatedAccessTokenExpire, _isAuthenticatedRefreshTokenExpire } from './auth.service';
import { TokenFormatService } from './token-format.service';
import { CryptoService } from 'src/app/common/directives/services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityCheckService {

  constructor(private toastrService: CustomToastrService, private router: Router,private tokenFormatService: TokenFormatService,private _crypto:CryptoService) { }

  identityCheck() {
    const jwtHelper = new JwtHelperService();
    debugger;
    let decyrptAccessToken=this._crypto.decrypto(localStorage.getItem("accessToken").toString());
    let parseAccessToken=JSON.stringify(decyrptAccessToken);
    //let accessTokenExpireParse = Date.parse(_isAuthenticatedAccessTokenExpire);

    let expired: boolean;

    try {
      expired = jwtHelper.isTokenExpired(parseAccessToken);

    } catch {
      expired = true;
    }

    _isAuthenticatedAccessToken = parseAccessToken !== null && !expired && parseAccessToken != undefined && expired != undefined && decyrptAccessToken!==null && decyrptAccessToken!=="";
    debugger;

    if (!_isAuthenticatedAccessToken) {

      let decyrptRefreshToken=this._crypto.decrypto(localStorage.getItem("refreshToken").toString());
      let parseRefreshToken=JSON.stringify(decyrptRefreshToken);

      let expiredRefreshToken: boolean = false;

      let refreshTokenExpireParse = new Date(_isAuthenticatedRefreshTokenExpire);
      const today = new Date();
      if (today > refreshTokenExpireParse) {
        expiredRefreshToken = true;
      }

      _isAuthenticatedRefreshToken = parseRefreshToken !== null && !expiredRefreshToken && parseRefreshToken!=undefined && expiredRefreshToken != undefined && decyrptRefreshToken!==null && decyrptRefreshToken!=="";

      if (!_isAuthenticatedRefreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.router.navigateByUrl("/login")
        this.toastrService.message("Yetkisiz Erişim", "Giriş Başarısız", {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight
        })
      }

    }

  }

  get isAuthenticatedAccessToken(): boolean {
    return _isAuthenticatedAccessToken;
  }

  get isAuthenticatedRefreshToken(): boolean {
    return _isAuthenticatedRefreshToken;
  }


}

export let _isAuthenticatedAccessToken: boolean;
export let _isAuthenticatedRefreshToken: boolean;

import { Injectable, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';
import { _isAuthenticatedAccessTokenExpire, _isAuthenticatedRefreshTokenExpire } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityCheckService {

  constructor(private toastrService: CustomToastrService, private router: Router) { }

  identityCheck() {
    const jwtHelper = new JwtHelperService();
    const token: string = localStorage.getItem("accessToken");
    let accessTokenExpireParse=Date.parse(_isAuthenticatedAccessTokenExpire);
    

    let expired: boolean;
    try {
      expired = jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticatedAccessToken = token != null && !expired && token != undefined && expired != undefined;
    debugger;

    if (!_isAuthenticatedAccessToken) {

      const refreshToken: string = localStorage.getItem("refreshToken");

      let expiredRefreshToken:boolean=false;

        let refreshTokenExpireParse=new Date(_isAuthenticatedRefreshTokenExpire);
        const today = new Date();
        if(today>refreshTokenExpireParse){
            expiredRefreshToken=true;
        }
      

      _isAuthenticatedRefreshToken = refreshToken != null && !expiredRefreshToken && expiredRefreshToken != undefined && expiredRefreshToken != undefined;

      if (!_isAuthenticatedRefreshToken) {
        debugger;
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

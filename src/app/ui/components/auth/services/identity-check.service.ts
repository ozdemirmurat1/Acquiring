import { Injectable, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityCheckService {

  constructor(private toastrService:CustomToastrService,private router:Router) { }

  identityCheck() {
    const jwtHelper=new JwtHelperService();
    const token: string = localStorage.getItem("accessToken");
    debugger;

    let expired: boolean;
    try {
      expired = jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired && token!=undefined && expired!=undefined;

    if(!_isAuthenticated){
      this.router.navigateByUrl("/login")
      this.toastrService.message("Yetkisiz Erişim", "Giriş Başarısız", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })

    }

  }

  get isAuthenticated(): boolean {
   
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;

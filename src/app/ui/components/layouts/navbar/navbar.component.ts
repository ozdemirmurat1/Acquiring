import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { IdentityCheckService } from '../../auth/services/identity-check.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/common/directives/services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor(public identityCheckService:IdentityCheckService,private toastrService:CustomToastrService,private router:Router) {
      identityCheckService.identityCheck();
    }

    signOut() {
      localStorage.removeItem("accessToken");
      this.identityCheckService.identityCheck();
      this.router.navigateByUrl("/login")
      this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
    }
  
}

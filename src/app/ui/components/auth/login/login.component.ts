import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdentityCheckService } from '../services/identity-check.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BaseComponent, SpinnerType } from 'src/app/common/base/base.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ValidInputDirective, LoadingButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private authService: AuthService, spinner: NgxSpinnerService, private identityCheckService: IdentityCheckService, private activatedRoute: ActivatedRoute, private router: Router) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  async login(form: NgForm) {
    if (form.valid) {
      this.showSpinner(SpinnerType.BallAtom);
        await this.authService.login(form.value, () => {
        this.identityCheckService.identityCheck();

        // this.activatedRoute.queryParams.subscribe(params => {
        //   const returnUrl: string = params["returnUrl"];
        //   if (returnUrl)
        //     this.router.navigate([returnUrl]);
        // });
        this.router.navigateByUrl("/");
        this.hideSpinner(SpinnerType.BallAtom);
      });
    }

  }
}

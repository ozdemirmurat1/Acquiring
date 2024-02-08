import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './toastr.service';
import { SpinnerType } from '../../base/base.component';
import { Observable, catchError, of } from 'rxjs';
import { Errors } from '../../models/error-model';
import { AlertifyService, MessageType, Position } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private router: Router, private spinner: NgxSpinnerService,private alertify:AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {

      error: HttpErrorResponse;
      let customError: Errors;
      let message = "";
      debugger;
      customError = error.error;
      if (customError.Errors!=null) {
        debugger;
        const _error: Array<{ Property: string, Errors: Array<string> }> = customError.Errors;
        
        _error.forEach((v, index) => {
          v.Errors.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
      }

      debugger;

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          if(message!=""){
            this.alertify.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
          }
          else{
            this.toastrService.message(message ? message : customError.detail, customError.status.toString(), {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          }

          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          if(message!=""){
            this.alertify.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
          }
          else{
            this.toastrService.message(message ? message : customError.detail, customError.status.toString(), {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          }
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        default:
          if(message!=""){
            this.alertify.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
          }
          else{
            this.toastrService.message(message ? message : customError.detail, "Beklenmeyen Durum Oluştu", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          }
          break;
      }

      this.spinner.hide(SpinnerType.BallAtom);
      return of(error);
    }));
  }
}

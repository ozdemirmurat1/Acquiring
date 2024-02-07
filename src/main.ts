/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import { importProvidersFrom } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StoreModule, provideStore } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { loadingReducer } from './app/common/states/loading/loading-reducer';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from './app/ui/components/auth/guards/auth.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './app/common/directives/services/error.service';


// layouts componentin içini oluştur

bootstrapApplication(AppComponent,{
  providers:[
    { provide: "baseUrl", useValue: "https://localhost:7072/api", multi: true },
    DatePipe,
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      JwtHelperService,
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      NgxSpinnerModule,
      SweetAlert2Module.forRoot(),
      StoreModule.forRoot({loading:loadingReducer}),
      RouterModule.forRoot([
          {
            path:"",
            loadComponent:()=>import("./app/ui/components/layouts/layouts.component").then(c=>c.LayoutsComponent),
            canActivate:[AuthGuard],
            children:[
              {
                path:"",
                loadComponent:()=>import("./app/ui/components/blank/blank.component").then(c=>c.BlankComponent),
                canActivate:[AuthGuard]
              },
              {
                path:"chains",
                loadComponent:()=> import ("./app/ui/components/chain/chain.component").then(c=>c.ChainComponent),
                canActivate:[AuthGuard]
              },
              { 
                path: "chains/:pageNo",
                loadComponent:()=> import("./app/ui/components/chain/chain.component").then(module => module.ChainComponent)},
              {
                path:"merchants",
                loadComponent:()=> import ("./app/ui/components/merchant/merchant.component").then(c=>c.MerchantComponent),
                canActivate:[AuthGuard]
              },
              {
                path:"terminals",
                loadComponent:()=> import ("./app/ui/components/terminal/terminal.component").then(c=>c.TerminalComponent),
                canActivate:[AuthGuard]
              },
              {
                path:"logs",
                loadComponent:()=> import ("./app/ui/components/log/log.component").then(c=>c.LogComponent),
                canActivate:[AuthGuard]
              }
            ]
          },
          {
            path: "login",
            loadComponent: () => import("./app/ui/components/auth/login/login.component").then(c => c.LoginComponent)
          }
      ])),
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true },
      provideStore()
  ]
})
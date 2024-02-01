import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {

  isloading:boolean=false;  // state
  @Input() form:NgForm;
  @Input() btnName:string="";
  @Input() btnLoadingDescription:string="";
  @Input() btnClass:string="btn-outline-primary w-100";
  @Input() btnLoadingClass:string="btn-outline-primary w-100";
  @Input() iconClass:string="fa fa-save";

  constructor(
    // loading ismi main.ts dosyasında tanımlanan isimle birebir aynı olacak
    private store:Store<{loading:boolean}>
  ){
      // subscribe veri değiştikçe takip eder
    this.store.select("loading").subscribe(res=>{
      this.isloading=res
    });
  }

}

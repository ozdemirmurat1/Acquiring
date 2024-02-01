import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent, SpinnerType } from 'src/app/common/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChainService } from './services/chain.service';
import { AlertifyService, MessageType, Position } from 'src/app/common/directives/services/alertify.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ChainModel } from './models/chain.model';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';

@Component({
  selector: 'app-chain',
  standalone: true,
  imports: [CommonModule,BlankComponent,SectionComponent],
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent extends BaseComponent implements OnInit {
  
  navs:NavModel[]=[
    {
      routerLink:"/",
      class:"",
      name:"Ana Sayfa"
    },
    {
      routerLink:"/reports",
      class:"active",
      name:"Raporlar"
    }
  ]

  data:PaginationResultModel<ChainModel>=new PaginationResultModel<ChainModel>;;
  pageNumber:number=0;
  pageSize:number=5;
  pageNumbers:number[]=[];
  interval:any;
  count:number=0;

  constructor(spinner: NgxSpinnerService,
    private chainService: ChainService,
    private alertifyService: AlertifyService) {
    super(spinner)
  }

  async getAll() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { data: PaginationResultModel<ChainModel>  } = await this.chainService.read(this.pageNumber,this.pageSize,() => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.data=allProducts.data;
    console.log(this.data.items);

    this.pageNumbers=[];
        for (let i = 0; i < allProducts.data.Count; i++) {
          this.pageNumbers.push(i+1);
        }
    
  }

  ngOnInit(): void {
    this.getAll();
    // this.interval=setInterval(()=>{
    //   if(this.count<25){
    //     this.count++;
    //     this.getAll();
    //   }else{
    //     clearInterval(this.interval);
    //   }
    // },5000)
  }

}

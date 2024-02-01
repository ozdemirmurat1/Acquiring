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
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chain',
  standalone: true,
  imports: [CommonModule, BlankComponent, SectionComponent,RouterModule],
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent extends BaseComponent implements OnInit {

  navs: NavModel[] = [
    {
      routerLink: "/",
      class: "",
      name: "Ana Sayfa"
    },
    {
      routerLink: "/reports",
      class: "active",
      name: "Raporlar"
    }
  ]

  data: PaginationResultModel<ChainModel> = new PaginationResultModel<ChainModel>;;
  pageNumber: number;
  pageSize: number = 5;
  pageList: number[] = [];
  totalPageCount: number;
  currentPageNo: number;
  defaultPageNumber: number = 1;

  constructor(spinner: NgxSpinnerService,
    private chainService: ChainService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute) {
    super(spinner)
  }

  async getAll() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { data: PaginationResultModel<ChainModel> } = await this.chainService.read(this.pageNumber ? this.pageNumber : 0, this.pageSize ? this.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.data = allProducts.data;
    //console.log(this.data.items);

  }

  async ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1)
    
    
    console.log(this.currentPageNo);
    debugger;

      const allProducts: { data: PaginationResultModel<ChainModel> } = await this.chainService.read(this.currentPageNo-1,this.pageSize, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }))
      //console.log(this.currentPageNo)

      this.data = allProducts.data;
      this.data.count =allProducts.data.count;
      this.totalPageCount = Math.ceil(this.data.count / this.pageSize);


      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);

    });

}

}

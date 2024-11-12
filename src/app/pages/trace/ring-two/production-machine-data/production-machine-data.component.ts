import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-production-machine-data',
  templateUrl: './production-machine-data.component.html',
  styleUrls: ['./production-machine-data.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class ProductionMachineDataComponent {
  constructor(
    public service: AppService,
    private cookieService: CookieService
  ) {}
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  dataProduct: any;
  productLotNo: any;
  linecode: any;
  searchData: any;
  activeTabId: number = 1;
  tabs = [
    { id: 1, title: 'Preparation' },
    { id: 2, title: 'Injection' },
    { id: 3, title: 'Blow' },
    { id: 4, title: 'Filler' },
    { id: 5, title: 'Packing' },
    { id: 6, title: 'Caser' },
  ];

  ngOnInit() {
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }
    const storedDataProduct = localStorage.getItem('product');
    if (storedDataProduct) {
      this.dataProduct = JSON.parse(storedDataProduct);
      this.productLotNo = this.dataProduct.dataProdidentity.lotno;
      this.linecode = this.dataProduct.dataProdidentity.line;
    }
    this.searchData = history.state.data;
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring Two', active: true },
    ];
    const savedTabId = this.cookieService.get(
      'activeTabIdRingTwoProductionData'
    );
    if (savedTabId) this.activeTabId = +savedTabId;
    console.log(this.activeTabId);
  }

  saveTab(tabId: number) {
    this.activeTabId = tabId;
   this.cookieService.set(
     'activeTabIdRingTwoProductionData',
     tabId.toString(),
     7
   );
  }
}

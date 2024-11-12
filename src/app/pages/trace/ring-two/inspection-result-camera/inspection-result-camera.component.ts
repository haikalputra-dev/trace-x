import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inspection-result-camera',
  templateUrl: './inspection-result-camera.component.html',
  styleUrls: ['./inspection-result-camera.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class InspectionResultCameraComponent implements OnInit{
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
    { id: 1, title: 'Label Area' },
    { id: 2, title: 'IJP Area' },
    { id: 3, title: 'CAP Area' }
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
      'activeTabIdRingTwoInspectionResultCamera'
    );
    if (savedTabId) this.activeTabId = +savedTabId;
    console.log(this.activeTabId);
  }

  saveTab(tabId: number) {
    this.activeTabId = tabId;
    this.cookieService.set(
      'activeTabIdRingTwoInspectionResultCamera',
      tabId.toString(),
      7
    );
  }
}

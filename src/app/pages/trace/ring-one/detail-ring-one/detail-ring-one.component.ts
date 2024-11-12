import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { Router } from '@angular/router';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-ring-one',
  templateUrl: './detail-ring-one.component.html',
  styleUrls: ['./detail-ring-one.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class DetailRingOneComponent {
  constructor(
    public service: AppService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  productLotNo: any;
  breadCrumbItems!: Array<{}>;
  searchData: any;
  currentUserLogin: any;
  dataProduct: any;
  tabs = [
    { id: 1, title: 'IPC Quality Result' },
    { id: 2, title: 'Microbiology Result' },
    { id: 3, title: 'Bottle Dimension Result' },
    { id: 4, title: 'Capping Performance Result' },
    { id: 5, title: 'Preform check Result' },
    { id: 6, title: 'CCP Result' },
    { id: 7, title: 'Preparation Syrup Result' },
    { id: 8, title: 'Abnormally Result' },
    { id: 9, title: 'Operator Manual Insp.Result' },
    { id: 10, title: 'Bottle Pressure Result' },
    { id: 11, title: 'Packaging Material Result' },
  ];
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }
    const storedDataProduct = localStorage.getItem('product');
    if (storedDataProduct) {
      this.dataProduct = JSON.parse(storedDataProduct);
      console.log(this.dataProduct);
      this.productLotNo = this.dataProduct.dataProdidentity.lotno;
    }
    this.searchData = history.state.data;
    console.log(history.state);
    console.log(this.searchData);
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring One', active: true },
    ];
     const savedTabId = this.cookieService.get('activeTabIdRingOne');
    if (savedTabId) {
      this.activeTabId = +savedTabId;
    }
  }

  activeTabId: number = 1;
  saveTab(tabId: number): void {
    this.activeTabId = tabId;
     this.cookieService.set('activeTabIdRingOne', tabId.toString(), 7);
  }

  navigateToBack() {
    const searchData = this.searchData;
    this.router.navigate(['/protrace/general-information'], {
      state: { searchData },
    });
  }
}

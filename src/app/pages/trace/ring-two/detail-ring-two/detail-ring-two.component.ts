import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { Router } from '@angular/router';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-ring-two',
  templateUrl: './detail-ring-two.component.html',
  styleUrls: ['./detail-ring-two.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class DetailRingTwoComponent {
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  productLotNo: any;
  dataProduct: any;
  linecode: any;
  searchData: any;
  activePanelId = 'utility-machine'; // Set panel aktif default di sini

  panels = [
    { id: 'utility-machine', title: 'Production Machine Utility Data' },
    { id: 'production-machine', title: 'Production Machine Data' },
    { id: 'cleaning-sanitation', title: 'Cleaning & Sanitation Result' },
    { id: 'inspection-result-camera', title: 'Inspection Result Camera' },
    { id: 'inspection-external-result', title: 'Inspection External Result' },
    { id: 'water-performance-result', title: 'Water Performance Result' },
  ];

  constructor(
    public service: AppService,
    private router: Router,
    private cookieService: CookieService
  ) {}

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

    const lastActivePanel = this.cookieService.get('activePanelIdRingTwo');
    if (lastActivePanel) {
      this.activePanelId = lastActivePanel;
    }

    this.searchData = history.state.data;
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring Two', active: true },
    ];
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  navigateToBack() {
    const searchData = this.searchData;
    this.router.navigate(['/protrace/general-information'], {
      state: { searchData },
    });
  }

  onPanelChange(panelId: string) {
    this.cookieService.set('activePanelIdRingTwo', panelId, 7);
  }
}

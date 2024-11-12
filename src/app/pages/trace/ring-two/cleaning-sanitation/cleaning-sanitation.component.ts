import { Component} from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  formatNumber,
} from 'src/app/utils/helper';
@Component({
  selector: 'app-cleaning-sanitation',
  templateUrl: './cleaning-sanitation.component.html',
  styleUrls: ['./cleaning-sanitation.component.scss'],
})
export class CleaningSanitationComponent {
  formatNumber = (num: any) => {
    return formatNumber(num);
  };

  isActiveToggleClean: boolean = false;
  isActiveToggleCleanDetail: boolean = false;
  cleanType: any;

  dataSectionCleaning: any[] = [];
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  dataProduct: any;
  productLotNo: any;
  linecode: any;
  searchData: any;
  activeTitle: any;

  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  listData = [];
  dataSearch: any;

  pageSizeCleaning: number = 5;
  pageCleaning: number = 1;
  searchTermCleaning: string = '';
  totalRecordsCleaning: any;
  totalPagesCleaning: any;
  startIndexCleaning: number = 1;
  endIndexCleaning: number = this.pageSizeCleaning;
  listDataCleaning = [];
  dataSearchCleaning: any;
  dataSections: any = [];
  dataCleaningSanitation: any;
  dataResultTable: any = [];
  pdfSrc: any = '';
  pdfUrl =
    'https://myapps.aio.co.id/jasperserver/rest_v2/reports/reports/OCI_3/Filling_1/96_pemeriksaan_proses_cop_.pdf?lotno=';
  username = 'jasperadmin';
  password = 'jasperadmin';

  constructor(
    public service: AppService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
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
    this.searchData = history.state.data;

    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring Two', active: true },
    ];

    this.onTabChangeCleaningSanitation();
  }

  onTabChangeCleaningSanitation() {
    this.isActiveToggleClean = false;
    this.dataSections = [];
    this.dataCleaningSanitation = [];
    this.spinner.show();
    this.service
      .get(`/cleaning-sanitation/cleaning/${this.linecode}`)
      .subscribe(
        (result) => {
          if (result.success) {
            this.spinner.hide();
            this.dataCleaningSanitation = result.data;
            this.dataSearch = this.dataCleaningSanitation;
            this.listData = this.dataCleaningSanitation;
            this.totalRecords = this.listData.length;
            this.setPaginationData();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          console.error('Error fetching data:', error);
        }
      );
  }

  getPdf(
    url: string,
    username: string,
    password: string,
    lotno: string
  ): Observable<Blob> {
    const proxyUrl = `${this.service.url()}/cleaning-sanitation/jasper-pdf?url=${encodeURIComponent(
      url
    )}${lotno}&username=${username}&password=${password}`;
    return this.http.get(proxyUrl, { responseType: 'blob' });
  }

  loadPdf(lotno: any, url: any) {
    this.getPdf(url, this.username, this.password, lotno).subscribe(
      (pdfBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = new Uint8Array(e.target.result);
        };
        reader.readAsArrayBuffer(pdfBlob);
      },
      (error) => {
        console.error('Error loading PDF:', error);
      }
    );
  }

  toggleView(data: any = {}) {
    if (Object.keys(data).length > 0) {
      this.loadPdf(this.productLotNo, data.url_pdf);
    }
    this.isActiveToggleClean = !this.isActiveToggleClean;
    this.isActiveToggleCleanDetail = false;
  }

  toggleViewDetail(data: any = {}) {
    if (data) {
      this.isActiveToggleCleanDetail = !this.isActiveToggleCleanDetail;
      this.isActiveToggleClean = false;
      this.cleanType = data.type;
      this.listDataCleaning = [];
      this.dataSectionCleaning = [];
      if (this.cleanType == 'CIP OC3 Process') {
        this.dataSectionCleaning.push(
          {
            item: 'nozzle_cap_positioning',
            title: 'Nozzle Cap Positioning',
          },
          {
            item: 'remain_solution_drain',
            title: 'Remain Solution Drain',
          },
          {
            item: 'cip_hot_water',
            title: 'CIP Hot Water',
          },
          {
            item: 'cip_alkali_circulation',
            title: 'CIP Alkali Circulation',
          },
          {
            item: 'cip_alkali_rinsing',
            title: 'CIP Alkali Rinsing Water Rinse 2',
          }
        );
        this.onTabChangeCleaningSanitationDetail(
          this.dataSectionCleaning[0].item
        );
      } else if (this.cleanType == 'COP Process') {
        this.dataSectionCleaning.push(
          {
            item: 'cop_1st_hot_water_oc3',
            title: 'COP 1st Hot Water',
          },
          {
            item: 'cop_drain_oc3',
            title: 'Drain 1',
          },
          {
            item: 'cop_alkali_oc3',
            title: 'COP Alkali',
          },
          {
            item: 'cop_drain_alkali_oc3',
            title: 'Drain Alkali',
          },
          {
            item: 'cop_2nd_hot_water_oc3',
            title: 'COP 2nd Hot Water',
          },
          {
            item: 'cop_drain_2_oc3',
            title: 'Drain 2',
          }
        );
        this.onTabChangeCleaningSanitationDetail(
          this.dataSectionCleaning[0].item
        );
      }
    }
  }

  onTabChangeCleaningSanitationDetail(section: any) {
    if (section == 'nozzle_cap_positioning') {
      this.activeTitle = 'Nozzle Cap Positioning';
    } else if (section == 'remain_solution_drain') {
      this.activeTitle = 'Remain Solution Drain';
    } else if (section == 'cip_hot_watet') {
      this.activeTitle = 'CIP Hot Water';
    }
    this.onFetchDataTableCleaningSanitation(section);
  }

  onFetchDataTableCleaningSanitation(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    const min = this.formatNumber(this.dataResultTable[section.minKey]);
    const max = this.formatNumber(this.dataResultTable[section.maxKey]);
    this.service
      .post(`/cleaning-sanitation/table-data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: section,
        ring: '2',
        type_data: 'Table',
        min: min,
        max: max,
        product_category: this.searchData.productCategory,
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          console.log(result);

          if (result.success && result.status === 200) {
            this.listDataCleaning = result.data;
            this.dataSearchCleaning = result.data;
            this.totalRecordsCleaning = this.listDataCleaning.length;
            this.setPaginationData();
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  onError(error: any) {
    console.error('Error loading PDF:', error);
  }

  onLoadComplete(pdf: any) {}

  setPaginationData() {
    this.totalPagesCleaning = Math.ceil(
      this.totalRecordsCleaning / this.pageSizeCleaning
    );
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
  }

  onSearchAll(searchTerm: string) {
    if (!searchTerm) {
      this.listData = this.dataSearch;
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.listData = this.dataSearch.filter((data: any) => {
        return Object.keys(data).some((key) => {
          return (
            data[key] &&
            data[key].toString().toLowerCase().includes(searchTermLower)
          );
        });
      });
    }
  }
  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.totalRecords);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationDataCleaning() {
    this.totalPagesCleaning = Math.ceil(
      this.totalRecordsCleaning / this.pageSizeCleaning
    );
  }

  getShowingTextCleaning(): string {
    const startIndex = (this.pageCleaning - 1) * this.pageSizeCleaning + 1;
    const endIndex = Math.min(
      this.pageCleaning * this.pageSizeCleaning,
      this.totalRecordsCleaning
    );
    return `Showing ${startIndex} - ${endIndex}`;
  }

  onPageSizeChangeCleaning(newPageSize: string) {
    this.pageSizeCleaning = parseInt(newPageSize, 10);
    this.startIndexCleaning = 1;
    this.endIndexCleaning = this.pageSizeCleaning;
    this.setPaginationData();
  }

  onSearchAllCleaning(searchTerm: string) {
    if (!searchTerm) {
      this.listDataCleaning = this.dataSearchCleaning;
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.listDataCleaning = this.dataSearchCleaning.filter((data: any) => {
        return Object.keys(data).some((key) => {
          return (
            data[key] &&
            data[key].toString().toLowerCase().includes(searchTermLower)
          );
        });
      });
    }
  }
}

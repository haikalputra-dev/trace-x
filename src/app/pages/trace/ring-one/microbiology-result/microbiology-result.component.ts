import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-microbiology-result',
  templateUrl: './microbiology-result.component.html',
  styleUrls: ['./microbiology-result.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class MicrobiologyResultComponent {
  constructor(public service: AppService, private spinner: NgxSpinnerService) {}

  listData: any;
  dataSearch: any;
  searchData: any;
  activeTitle: any;
  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;

  currentUserLogin: any;
  dataProduct: any;
  productLotNo: any;
  ngOnInit() {
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }
    const storedDataProduct = localStorage.getItem('product');
    if (storedDataProduct) {
      this.dataProduct = JSON.parse(storedDataProduct);
      this.productLotNo = this.dataProduct.dataProdidentity.lotno;
    }
    this.searchData = history.state.data;

    // inisiasi awal saat di buka pertama kali
    this.fetchDataResultMicrobiology('result_microbiology');
  }
  fetchDataResultMicrobiology(data_item: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    this.service
      .post(`/data/resultmicrobiology/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item,
        ring: '1',
        type_data: 'Table',
      })
      .subscribe({
        next: (data: any) => {
          if (data.success) {
            console.log(data.data);
    
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            this.setPaginationData();
          }
          this.spinner.hide();
        },
        error: (error) => {
           console.log(error);
          this.spinner.hide();
        },
        complete: () => {},
      });
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

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
  }

  checkPassDataMicrobiologyIfOK(dataMicrobiology: number): any {
    if (dataMicrobiology == 0) {
      return 'OK';
    }
    return dataMicrobiology;
  }

  checkPassDataMicrobiology(
    yeast: number,
    tab: number,
    tm: number,
    e_coli: number
  ): string {
    if (yeast == 0 && tab == 0 && tm == 0 && e_coli == 0) {
      return 'PASS';
    }
    return 'NOT PASS';
  }
}

import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-abnormally-result',
  templateUrl: './abnormally-result.component.html',
  styleUrls: ['./abnormally-result.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class AbnormallyResultComponent {
  constructor(public service: AppService, private spinner: NgxSpinnerService) {}

  listData: any;
  dataSearch: any;
  searchData: any;
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
  tabDataBottle: any;
  dynamicHeader: string = '';
  dynamicField: string = '';
  dynamicFieldData: any;
  isDynamicFieldArray: boolean = false;
  dataAbnormaly: any;
  dataResultAbnormallyChart: any;
  isTabActive: boolean = false;

  ngOnInit() {
    this._dataResultAbnormallyChart(
      '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
    );
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
    this.fetchDataResultAbnormally('result_abnormally');
  }

  fetchDataResultAbnormally(data_item: any) {
    console.log(data_item);
    this.spinner.show();

    this.service
      .post(`/data/resultabnormally/chart`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item,
        ring: '1',
        type_data: 'Chart',
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          const alarmCodes = data.data.map((item: any) => item.desc);
          const jumlahs = data.data.map((item: any) => item.jumlah);
          this.dataResultAbnormallyChart = {
            ...this.dataResultAbnormallyChart,
            series: [
              {
                name: 'Jumlah ',
                data: jumlahs,
              },
            ],
            xaxis: {
              categories: alarmCodes.map((desc: string) => [desc]),
              labels: {
                style: {
                  colors: this.dataResultAbnormallyChart.colors,
                  fontSize: '12px',
                },
              },
            },
          };
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(' ', '');
      if (newValue.indexOf(',') === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(
          newValue
        );
        if (color) {
          color = color.replace(' ', '');
          return color;
        } else return newValue;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(
            document.documentElement
          ).getPropertyValue(val[0]);
          rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }
  private _dataResultAbnormallyChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.dataResultAbnormallyChart = {
      series: [
        {
          data: [],
        },
      ],
      chart: {
        height: 450,
        type: 'bar',
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '30%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px',
          },
        },
      },
    };
  }
  toggleTab(): void {
    this.isTabActive = !this.isTabActive;
    if (this.isTabActive) {
      this.spinner.show();
      this.service
        .post(`/data/resultabnormally/table`, {
          lotno: this.searchData.dataProdidentity.lotno,
          line: this.searchData.dataProdidentity.line,
          tag: 'result_abnormally',
          ring: '1',
          type_data: 'Table',
        })
        .subscribe(
          (data: any) => {
            if (data.success) {
              console.log(data);
              this.listData = data.data;
              console.log(this.listData);
              this.dataAbnormaly = data.data;
              this.totalRecords = this.listData.length;
              console.log(this.totalRecords);
              this.setPaginationData();
              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          },
          (error) => {
            console.log(error);
            this.spinner.hide();
          }
        );
    }
  }

  formatDateToIndonesian(dateString: string): string {
    const date = new Date(dateString);

    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
  }

  onSearchAll(searchTerm: string) {
    console.log('Current searchTerm:', searchTerm);
    if (!searchTerm) {
      this.listData = this.dataSearch;
      console.log('a');
    } else {
      console.log('b');
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
}

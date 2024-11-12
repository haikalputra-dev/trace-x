import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Highcharts from 'highcharts';
import {
  formatNumber,
  lightenColor,
  transformData,
} from 'src/app/utils/helper';
import * as moment from 'moment';


@Component({
  selector: 'app-bottle-pressure',
  templateUrl: './bottle-pressure.component.html',
  styleUrls: ['./bottle-pressure.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class BottlePressureComponent {
  formatNumber = (num: any) => {
    return formatNumber(num);
  };
  transformData = (data: any) => {
    return transformData(data);
  };
  lightenColor = (colorCode: any, num: any) => {
    return lightenColor(colorCode, num);
  };

  constructor(public service: AppService, private spinner: NgxSpinnerService) {
    this.chartOptions = {
      chart: {
        zooming: {
          type: 'x',
        },
      },
      tooltip: {
        valueDecimals: 2,
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Pressure (in Bar)', // Optional: Update label if needed
        },
      },
      series: [
        {
          type: 'area', // Ensure this matches the series type
          data: [], // Will be populated dynamically
          lineWidth: 0.5,
          name: 'Bottle Pressure Result',
          marker: {
            enabled: false, // Improve rendering for large datasets
            radius: 2,
          },
          color: '#6bc4ff', // Optional: Set custom color
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, Highcharts.color('#6bc4ff').brighten(0.3).get()],
              [1, '#6bc4ff'],
            ],
          },
        },
      ],
    } as Highcharts.Options;
  }
  
  chartOptions: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  dataProduct: any;
  productLotNo: any;
  linecode: any;
  searchData: any;
  activeTitle: any;
  chartRendered= false
  ijpParsed:string = "";

  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  listData = [];
  dataSearch: any;
  isActiveToggle = false
  tabDataBottle: any;
  
  Min = 0
  Max = 0
  Avg = 0

  ngOnInit(){
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
    this.ijpParsed = this.formatTimeInput(this.searchData.ijp)
    console.log(this.ijpParsed);
    this.fetchDataBottlePressure()
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

  formatTimeInput(input: string): string {
    if (!input || input === "0000") {
      return "00:00";
    }
    if (input.length !== 4) throw new Error('Invalid time input');
    const hours = input.slice(0, 2);
    const minutes = input.slice(2, 4);
    return `${hours}:${minutes}`; // Format: HH:MM
  }

  transformDataBottlePressure(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
  }
  
  fetchDataBottlePressure(){
    this.isActiveToggle = false
    this.spinner.show();
    this.service
      .post(`/data/resultbottlepressure/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        pro: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tag: "result_bottle_pressure",
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.listData = result.data;
            this.dataSearch = result.data;
            this.totalRecords = this.listData.length;
            this.setPaginationData();
            console.log(this.listData);
            
          } else {
            this.listData = []
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  getDataRejectChart(data: any) {
    this.spinner.show();
    this.activeTitle = data.item;
    console.log('tagsssss',data.tag);
    
    this.service
      .post(`/data/resultbottlepressure/chart`, {
        lotno: this.searchData.dataProdidentity.lotno,
        pro: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tag: data.tag,  // This determines which query to use
        ring: '1',
        type_data: 'Chart',
        ijp: this.ijpParsed
      })
      .subscribe(
        (result: any) => {
          if (result.success && result.data?.length > 0) {
            console.log('Chart data:', result);
            
            const transformedData: [number, number][] = result.data.map((item: any) => {
              // Extract hours and minutes directly from waktu
              const [hours, minutes] = item.waktu.split(':').map(Number);
              
              // Create a base date for today
              const date = new Date();
              // Set the hours and minutes from the data
              date.setHours(hours, minutes, 0, 0);
              
              console.log('Original time:', item.waktu, 'Converted time:', date.toTimeString());

              return [
                date.getTime(),
                Number(item.total_reject_low || item.total_reject_high) || 0
              ];
            });

            // Calculate Min, Max, and Avg from the transformed data
            const values = transformedData.map(([_, value]) => value);
            this.Min = Math.min(...values);
            this.Max = Math.max(...values);
            this.Avg = values.reduce((sum, val) => sum + val, 0) / values.length;
            console.log(this.Min);
            console.log(this.Max);
            console.log(this.Avg);
            
            this.chartOptions = {
              chart: {
                zooming: {
                  type: 'x',
                },
              },
              title: {
                text: `Data ${data.item}`,
              },
              tooltip: {
                xDateFormat: '%H:%M',
                pointFormat: '<b>{point.y}</b><br/>',
                shared: true,
                valueDecimals: 2,
              },
              xAxis: {
                type: 'datetime',
                labels: {
                  format: '{value:%H:%M}',
                },
                dateTimeLabelFormats: {
                  hour: '%H:%M',
                  minute: '%H:%M'
                }
              },
              yAxis: {
                title: {
                  text: 'Total Rejects',
                },
                min: Math.min(...transformedData.map(([_, value]) => value)),
                max: Math.max(...transformedData.map(([_, value]) => value)),
                plotLines: [],
              },
              legend: {
                enabled: false,
              },
              time: {
                useUTC: false
              },
              plotOptions: {
                area: {
                  marker: {
                    radius: 1,
                  },
                  lineWidth: 2,
                  color: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                      [0, this.lightenColor('#6bc4ff', 0.3)],
                      [0.7, '#6bc4ff'],
                    ],
                  },
                  states: {
                    hover: {
                      lineWidth: 2,
                    },
                  },
                  threshold: null,
                },
              },
              series: [
                {
                  type: 'area',
                  name: data.item,
                  data: transformedData,
                },
              ],
            };

            this.chartRendered = true;
          } else {
            this.chartRendered = false;
          }
          this.spinner.hide();
        },
        (error) => {
          console.error(error);
          this.chartRendered = false;
          this.spinner.hide();
        }
      );
  }
  
  
  

  toggleViewChart(data: any){
    if(data != ''){
      this.getDataRejectChart(data)
    } 
    this.isActiveToggle = !this.isActiveToggle
  }
  
}

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
  selector: 'app-inspection-camera-cap-area-oc3',
  templateUrl: './cap-area-oc3.component.html',
  styleUrls: ['./cap-area-oc3.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail]
})
export class CapAreaOc3Component {
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
      series: [
        {
          type: 'area',
          data: [],
          lineWidth: 0.5,
          name: 'Data CCP Result',
        } as Highcharts.SeriesOptionsType,
      ],
    };
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

  // Inspection Result Camera
  pageSizeInspectionCamera: number = 5;
  pageInspectionCamera: number = 1;
  searchTermInspectionCamera: string = '';
  totalRecordsInspectionCamera: any;
  totalPagesInspectionCamera: any;
  startIndexInspectionCamera: number = 1;
  endIndexInspectionCamera: number = this.pageSizeInspectionCamera;
  listDataInspectionCamera = [];
  dataSearchInspectionCamera: any;
  isActiveToggleStatisticInspectionCamera = false
  
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
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring Two', active: true },
    ];

    this.fetchDataInspectionCamera('inspection_camera_oc3_cap', 'CAP Area')
  }

  transformDataInspectionCamera(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
  }

  toggleViewStaticInspectionCamera(data: any){
    if(data != ''){
      this.getDataStatisticInspectionCamera(data)
    } 
    this.isActiveToggleStatisticInspectionCamera = !this.isActiveToggleStatisticInspectionCamera
  }
  
  setPaginationDataInspectionCamera() {
    this.totalPagesInspectionCamera = Math.ceil(this.totalRecordsInspectionCamera / this.pageSizeInspectionCamera);
  }

  getShowingTextInspectionCamera(): string {
    const startIndex = (this.pageInspectionCamera - 1) * this.pageSizeInspectionCamera + 1;
    const endIndex = Math.min(this.pageInspectionCamera * this.pageSizeInspectionCamera, this.totalRecordsInspectionCamera);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  onPageSizeChangeInspectionCamera(newPageSize: string) {
    this.pageSizeInspectionCamera = parseInt(newPageSize, 10);
    this.startIndexInspectionCamera = 1;
    this.endIndexInspectionCamera = this.pageSizeInspectionCamera;
    this.setPaginationDataInspectionCamera();
  }

  onSearchAllInspectionCamera(searchTerm: string) {
    if (!searchTerm) {
      this.listDataInspectionCamera = this.dataSearchInspectionCamera;
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.listDataInspectionCamera = this.dataSearchInspectionCamera.filter((data: any) => {
        return Object.keys(data).some((key) => {
          return (
            data[key] &&
            data[key].toString().toLowerCase().includes(searchTermLower)
          );
        });
      });
    }
  }

  fetchDataInspectionCamera(data: any, title: any){
    this.isActiveToggleStatisticInspectionCamera = false
    this.spinner.show();
    this.activeTitle = title
    this.service
      .post(`/inspection-camera/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        pro: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tag: data,
        ring: '2',
        type_data: 'Table'
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.listDataInspectionCamera = result.data;
            this.dataSearchInspectionCamera = result.data;
            this.totalRecordsInspectionCamera = this.listDataInspectionCamera.length;
            this.setPaginationDataInspectionCamera();
          } else {
            this.listDataInspectionCamera = []
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  getDataStatisticInspectionCamera(data: any){
    this.spinner.show();
    this.activeTitle = data.item
    this.service
      .post(`/inspection-camera/statistic`, {
        lotno: this.searchData.dataProdidentity.lotno,
        pro: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tag: data.tag,
        ring: '2',
        type_data: 'Chart',
        table: data.table,
        field: data.field,
        start: this.searchData.dataProdidentity.prod_start,
        end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            const values = result.data.map((item: any) => Number(item.data));
            this.Min = Math.min(...values);
            this.Max = Math.max(...values);
            this.Avg = values.reduce((acc:any, val:any) => acc + val, 0) / values.length;
            console.log(this.Max);
            
            const minAsal = this.Min;
            const maxAsal = this.Max;

            const transformedData = this.transformDataInspectionCamera(result.data);
            let standardMin = Math.min(minAsal, 0);
            let standardMax = Math.max(maxAsal, 5);

            const bufferY = (standardMax - standardMin) * 0.1;
            const min = standardMin - bufferY;
            const max = standardMax + bufferY;
            const darkerGradientColor = this.lightenColor('#6bc4ff', 0.3);
            
            this.chartOptions = {
              chart: {
                zooming: {
                  type: 'x',
                },
              },
              title: {
                text: "Data Reject " + data.item,
              },
              tooltip: {
                valueDecimals: 2,
              },
              xAxis: {
                type: 'datetime',
              },
              yAxis: {
                title: {
                  text: 'Data',
                },
                min: min,
                max: max,

                plotLines: [],
              },
              legend: {
                enabled: false,
              },
              plotOptions: {
                area: {
                  marker: {
                    radius: 1,
                  },
                  lineWidth: 2,
                  color: {
                    linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1,
                    },
                    stops: [
                      [0, darkerGradientColor],
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
            this.spinner.hide();
          } else {
            this.chartRendered = false;
            this.spinner.hide();
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }
}

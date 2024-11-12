import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';

import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-ccpresult',
  templateUrl: './ccpresult.component.html',
  styleUrls: ['./ccpresult.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class CCPResultComponent {
  dataResultCCP: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  dataSections = [
    {
      data: 'tia413',
      data_item: 'result_ccp_tia413',
      title: 'Temperature in AUHT',
      maxKey: 'max_tia413',
      minKey: 'min_tia413',
      avgKey: 'avg_tia413',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      data: 'tia743',
      data_item: 'result_ccp_tia743',
      title: 'Temperatur cap sterilisasi',
      maxKey: 'max_tia743',
      minKey: 'min_tia743',
      avgKey: 'avg_tia743',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      data: 'fica411',
      data_item: 'result_ccp_fica411',
      title: 'Flow in AUHT',
      maxKey: 'max_fica411',
      minKey: 'min_fica411',
      avgKey: 'avg_fica411',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      data: 'h2o2_using',
      data_item: 'result_ccp_h2o2_using',
      title: 'Timing usage H202 cap steril',
      maxKey: 'max_h2o2_using',
      minKey: 'min_h2o2_using',
      avgKey: 'avg_h2o2_using',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
  ];

  activeTitle: any;
  searchData: any;
  currentUserLogin: any;
  dataProduct: any;
  productLotNo: any;
  chartRendered = false;
  dataStandard: any;

  constructor(public service: AppService, private spinner: NgxSpinnerService) {
    this.chartOptions = {
      chart: {
        zooming: {
          type: 'x',
        },
      },
      title: {
        text: '',
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
    this.fetchDataResultCCP('result_ccp');
  }

  fetchDataResultCCP(data_item: any) {
    console.log(data_item);
    this.spinner.show();
    this.activeTitle = this.dataSections[0].title;

    this.service
      .post(`/data/resultccp/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: data_item,
        ring: '1',
        type_data: 'Table',
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          console.log(data[0]);
          console.log(data.data[0]);
          this.dataResultCCP = data.data[0];
          if (this.dataResultCCP) {
            this.changeChart(this.dataSections[0]);
          }
          console.log(this.dataResultCCP);
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  changeChart(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    const min = this.formatNumber(this.dataResultCCP[section.minKey]);
    const max = this.formatNumber(this.dataResultCCP[section.maxKey]);
    this.service
      .post(`/data/resultccp/chart`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: section.data_item,
        ring: '1',
        data_atribut: section.data,
        type_data: 'Chart',
        min: min,
        max: max,
        product_category: this.searchData.productCategory,
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (data: any) => {
          if (data.success && data.status === 200) {
            const { minKey, maxKey, colorCode, title } = section;
            const minAsal = this.formatNumber(this.dataResultCCP[minKey]);
            const maxAsal = this.formatNumber(this.dataResultCCP[maxKey]);
            const { dataTrend, dataStandard } = data.data;
            const transformedData = this.transformData(dataTrend);
            this.dataStandard = dataStandard;
            let { min: standardMin, max: standardMax } = dataStandard;
            standardMin = Math.min(minAsal, standardMin);
            standardMax = Math.max(maxAsal, standardMax);
            const bufferY = (standardMax - standardMin) * 0.1;
            const min = standardMin - bufferY;
            const max = standardMax + bufferY;
            const darkerGradientColor = this.lightenColor(colorCode, 0.3);
            this.chartOptions = {
              title: {
                text: section.title,
              },

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
                  text: 'Value',
                },
                min: min,
                max: max,

                plotLines: [
                  {
                    value: dataStandard.min,
                    color: '#FF4560',
                    width: 2,
                    zIndex: 5,
                    label: {
                      text: 'Min',
                      align: 'right',
                      style: {
                        color: '#FF4560',
                      },
                    },
                  },
                  {
                    value: dataStandard.max,
                    color: '#00E396',
                    width: 2,
                    zIndex: 5,
                    label: {
                      text: 'Max',
                      align: 'right',
                      style: {
                        color: '#00E396',
                      },
                    },
                  },
                ],
              },
              legend: {
                enabled: false,
              },
              plotOptions: {
                area: {
                  marker: {
                    radius: 2,
                  },
                  lineWidth: 1,
                  color: {
                    linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1,
                    },
                    stops: [
                      [0, darkerGradientColor],
                      [0.7, colorCode],
                    ],
                  },

                  states: {
                    hover: {
                      lineWidth: 1,
                    },
                  },
                  threshold: null,
                },
              },
              series: [
                {
                  type: 'area',
                  name: section.title,
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
        },
        (error) => {
          this.chartRendered = false;
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  lightenColor(color: string, percentage: number): string {
    const r = Math.min(
      255,
      Math.floor(
        parseInt(color.slice(1, 3), 16) +
          (255 - parseInt(color.slice(1, 3), 16)) * percentage
      )
    );
    const g = Math.min(
      255,
      Math.floor(
        parseInt(color.slice(3, 5), 16) +
          (255 - parseInt(color.slice(3, 5), 16)) * percentage
      )
    );
    const b = Math.min(
      255,
      Math.floor(
        parseInt(color.slice(5, 7), 16) +
          (255 - parseInt(color.slice(5, 7), 16)) * percentage
      )
    );
    return `rgb(${r}, ${g}, ${b})`;
  }

  formatNumber = (num: any): number => {
    if (num === null || num === undefined) {
      num = 0;
    } else if (typeof num === 'string') {
      num = parseFloat(num);
    }
    if (isNaN(num)) {
      num = 0;
    }
    return parseFloat(num.toFixed(2));
  };
  
  transformData(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
  }
}

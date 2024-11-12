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

@Component({
  selector: 'app-production-machine-utility-preparation',
  templateUrl: './production-machine-utility-preparation.component.html',
  styleUrls: ['./production-machine-utility-preparation.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class ProductionMachineUtilityPreparationComponent {
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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  dataSections: any = [];
  activeTitle: string = '';
  dataResultTable: any = [];
  searchData: any;
  dataStandard: any;
  chartRendered = false;
  dataMinMaxPreparationAirCompressor8Bar: any = [];
  dataMinMaxPreparationChiller: any = [];
  dataMinMaxPreparationListrik: any = [];
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  dataProduct: any;
  productLotNo: any;
  linecode: any;

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

    this.onTabChange('', 'chiller_preparation');
  }

  onTabChange(event: any, section: any) {
    this.dataSections = [];
    if (section == 'chiller_preparation') {
      this.dataSections.push({
        data: 'temperature',
        title: 'Temperature',
        maxKey: 'MaxValueTemperature',
        minKey: 'MinValueTemperature',
        avgKey: 'AvgValueTemperature',
        tagChart: 'chiller_preparation_temperature',
        color: 'biru',
        colorCode: '#6bc4ff',
      });
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxPreparationChiller(section);
    } else if (section == 'air_compressor_8_bar_preparation') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_preparation_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_preparation_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxPreparationAirCompressor8Bar(section);
    } else if (section == 'listrik_preparation') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_preparation_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_preparation_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxPreparationListrik(section);
      this.onChangeChart(this.dataSections[0]);
    }
  }

  onChangeChart(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    const min = this.formatNumber(this.dataResultTable[section.minKey]);
    const max = this.formatNumber(this.dataResultTable[section.maxKey]);
    this.service
      .post(`/data-utility/trend`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: section.tagChart,
        ring: '2',
        type_data: 'Chart',
        min: min,
        max: max,
        product_category: this.searchData.productCategory,
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          if (result.success && result.status === 200) {
            const { minKey, maxKey, colorCode } = section;
            const minAsal = this.formatNumber(this.dataResultTable[minKey]);
            const maxAsal = this.formatNumber(this.dataResultTable[maxKey]);
            const { dataTrend, dataStandard } = result.data;
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
              chart: {
                zooming: {
                  type: 'x',
                },
              },
              title: {
                text: section.title,
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
                      [0.7, colorCode],
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

  fetchDataMinMaxPreparationAirCompressor8Bar(data_item: any) {
    this.spinner.show();
    this.service
      .post(`/data-utility/min-max`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: data_item,
        ring: '2',
        type_data: 'Table',
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.dataMinMaxPreparationAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxPreparationAirCompressor8Bar = [];
            this.dataResultTable = [];
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  fetchDataMinMaxPreparationChiller(data_item: any) {
    this.spinner.show();
    this.service
      .post(`/data-utility/min-max`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: data_item,
        ring: '2',
        type_data: 'Table',
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.dataMinMaxPreparationChiller = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxPreparationChiller = [];
            this.dataResultTable = [];
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  fetchDataMinMaxPreparationListrik(data_item: any) {
    this.spinner.show();
    this.service
      .post(`/data-utility/min-max`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: data_item,
        ring: '2',
        type_data: 'Table',
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.dataMinMaxPreparationListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxPreparationListrik = [];
            this.dataResultTable = [];
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

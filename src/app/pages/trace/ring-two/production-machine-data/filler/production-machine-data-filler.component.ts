import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Highcharts from 'highcharts';
import {
  formatNumber,
  lightenColor,
  transformDataProduction,
} from 'src/app/utils/helper';

@Component({
  selector: 'app-production-machine-data-filler',
  templateUrl: './production-machine-data-filler.component.html',
  styleUrls: ['./production-machine-data-filler.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class ProductionMachineDataFillerComponent {
  formatNumber = (num: any) => {
    return formatNumber(num);
  };
  transformDataProduction = (data: any) => {
    return transformDataProduction(data);
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
  dataMinMaxProductionFiller: any = [];
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
    console.log('oke');

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
    this.onTabChangeProductionMachine('production_filler');
  }
  onTabChangeProductionMachine(section: any) {
    this.dataSections = [];
    if (section == 'production_filler') {
      this.dataSections.push(
        {
          data: 'flow_m741',
          title: 'Flow M741',
          maxKey: 'MaxValueFlowM741',
          minKey: 'MinValueFlowM741',
          avgKey: 'AvgValueFlowM741',
          tagChart: 'production_filler_flow_m741',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'frequency_pump_f741',
          title: 'Frequency Pump F741',
          maxKey: 'MaxValueFrequencyPumpF741',
          minKey: 'MinValueFrequencyPumpF741',
          avgKey: 'AvgValueFrequencyPumpF741',
          tagChart: 'production_filler_frequency_pump_f741',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'ln2_level',
          title: 'LN2 Level',
          maxKey: 'MaxValueLn2Level',
          minKey: 'MinValueLn2Level',
          avgKey: 'AvgValueLn2Level',
          tagChart: 'production_filler_ln2_level',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'ln2_pressure',
          title: 'LN2 Pressure',
          maxKey: 'MaxValueLn2Pressure',
          minKey: 'MinValueLn2Pressure',
          avgKey: 'AvgValueLn2Pressure',
          tagChart: 'production_filler_ln2_pressure',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'opening_valve_ln2',
          title: 'Opening Valve LN2',
          maxKey: 'MaxValueOpeningValveLn2',
          minKey: 'MinValueOpeningValveLn2',
          avgKey: 'AvgValueOpeningValveLn2',
          tagChart: 'production_filler_opening_valve_ln2',
          color: 'biru',
          colorCode: '#6bc4ff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionFiller(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    }
  }

  fetchDataMinMaxProductionFiller(data_item: any) {
    this.spinner.show();
    this.service
      .post(`/data-production/min-max`, {
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
            this.dataMinMaxProductionFiller = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionFiller = [];
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

  onChangeChartProductionMachineData(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    const min = this.formatNumber(this.dataResultTable[section.minKey]);
    const max = this.formatNumber(this.dataResultTable[section.maxKey]);
    this.service
      .post(`/data-production/trend`, {
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
            const { minKey, maxKey, colorCode, title } = section;
            const minAsal = this.formatNumber(this.dataResultTable[minKey]);
            const maxAsal = this.formatNumber(this.dataResultTable[maxKey]);
            const { dataTrend, dataStandard } = result.data;

            const transformedData = this.transformDataProduction(dataTrend);
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
}

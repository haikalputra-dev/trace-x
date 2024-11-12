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
  selector: 'app-production-machine-data-packing',
  templateUrl: './production-machine-data-packing.component.html',
  styleUrls: ['./production-machine-data-packing.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class ProductionMachineDataPackingComponent {
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
    // this.chartData(["#6bc4ff"]);
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
  dataMinMaxProductionPackingMeasured: any = [];
  dataMinMaxProductionPackingInternalPressure: any = [];
  dataMinMaxProductionPackingInternalPressureJudmentValue: any = [];
  dataMinMaxProductionPackingDetailsDefectives: any = [];
  dataMinMaxProductionPackingCap1: any = [];
  dataMinMaxProductionPackingCap2: any = [];
  dataMinMaxProductionPackingRsb: any = [];
  dataMinMaxProductionPackingOther: any = [];
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
    this.onTabChangeProductionMachine('production_packing_measured_value');
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

  onTabChangeProductionMachine(section: any) {
    this.dataSections = [];
    if (section == 'production_packing_measured_value') {
      this.dataSections.push(
        {
          data: 'front',
          title: 'Measured Value - Front',
          maxKey: 'MaxValueFront',
          minKey: 'MinValueFront',
          avgKey: 'AvgValueFront',
          tagChart: 'production_packing_measured_value_front',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'rear',
          title: 'Measured Value - Rear',
          maxKey: 'MaxValueRear',
          minKey: 'MinValueRear',
          avgKey: 'AvgValueRear',
          tagChart: 'production_packing_measured_value_rear',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'f_r_average',
          title: 'Measured Value - F-R Average',
          maxKey: 'MaxValueFRAverage',
          minKey: 'MinValueFRAverage',
          avgKey: 'AvgValueFRAverage',
          tagChart: 'production_packing_measured_value_f_r_average',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'f_r_difference',
          title: 'Measured Value - F-R Difference',
          maxKey: 'MaxValueFRDifference',
          minKey: 'MinValueFRDifference',
          avgKey: 'AvgValueFRDifference',
          tagChart: 'production_packing_measured_value_f_r_difference',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'actual_u_ng',
          title: 'Measured Value - Actual U-NG',
          maxKey: 'MaxValueActualUNG',
          minKey: 'MinValueActualUNG',
          avgKey: 'AvgValueActualUNG',
          tagChart: 'production_packing_measured_value_actual_u_ng',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'actual_l_ng',
          title: 'Measured Value - Actual L-NG',
          maxKey: 'MaxValueActualLNG',
          minKey: 'MinValueActualLNG',
          avgKey: 'AvgValueActualLNG',
          tagChart: 'production_packing_measured_value_actual_l_ng',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'measured',
          title: 'Measured Value - Measured',
          maxKey: 'MaxValueMeasured',
          minKey: 'MinValueMeasured',
          avgKey: 'AvgValueMeasured',
          tagChart: 'production_packing_measured_value_measured',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingMeasured(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_internal_pressure') {
      this.dataSections.push(
        {
          data: 'avg_100_cases',
          title: 'Internal Pressure - Average of 100 Cases',
          maxKey: 'MaxValueAVG100Cases',
          minKey: 'MinValueAVG100Cases',
          avgKey: 'AvgValueAVG100Cases',
          tagChart: 'production_packing_internal_pressure_avg_100_cases',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'final_defect',
          title: 'Internal Pressure - Final Defect',
          maxKey: 'MaxValueFinalDefect',
          minKey: 'MinValueFinalDefect',
          avgKey: 'AvgValueFinalDefect',
          tagChart: 'production_packing_internal_pressure_final_defect',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'defective_ung',
          title: 'Internal Pressure - Fraction defective U-NG (%)',
          maxKey: 'MaxValueDefectiveUNG',
          minKey: 'MinValueDefectiveUNG',
          avgKey: 'AvgValueDefectiveUNG',
          tagChart: 'production_packing_internal_pressure_defective_u_ng',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'defective_lng',
          title: 'Internal Pressure - Fraction defective L-NG (%)',
          maxKey: 'MaxValueDefectiveLNG',
          minKey: 'MinValueDefectiveLNG',
          avgKey: 'AvgValueDefectiveLNG',
          tagChart: 'production_packing_internal_pressure_defective_l_ng',
          color: 'orange',
          colorCode: '#ffe66a',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingInternalPressure(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_internal_pressure_judment_value') {
      this.dataSections.push(
        {
          data: 'total_avg',
          title: 'Internal Pressure Judment Value - Total Average',
          maxKey: 'MaxValueTotalAverage',
          minKey: 'MinValueTotalAverage',
          avgKey: 'AvgValueTotalAverage',
          tagChart: 'production_packing_internal_pressure_judment_total_average',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'deviation',
          title: 'Internal Pressure Judment Value - Deviation',
          maxKey: 'MaxValueDeviation',
          minKey: 'MinValueDeviation',
          avgKey: 'AvgValueDeviation',
          tagChart: 'production_packing_internal_pressure_judment_deviation',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingInternalPressureJudmentValue(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_details_defectives') {
      this.dataSections.push(
        {
          data: 'lng',
          title: 'Details Defectives - L-NG',
          maxKey: 'MaxValueLNG',
          minKey: 'MinValueLNG',
          avgKey: 'AvgValueLNG',
          tagChart: 'production_packing_details_defectives_lng',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'ung',
          title: 'Details Defectives - U-NG',
          maxKey: 'MaxValueUNG',
          minKey: 'MinValueUNG',
          avgKey: 'AvgValueUNG',
          tagChart: 'production_packing_details_defectives_ung',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'reject_bpd',
          title: 'Details Defectives - Number of Defectives (pce)',
          maxKey: 'MaxValueBPD',
          minKey: 'MinValueBPD',
          avgKey: 'AvgValueBPD',
          tagChart: 'production_packing_details_defectives_bpd',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingDetailsDefectives(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_cap_1') {
      this.dataSections.push(
        {
          data: 'total',
          title: 'Cap 1 - Total Number Defects',
          maxKey: 'MaxValueTotal',
          minKey: 'MinValueTotal',
          avgKey: 'AvgValueTotal',
          tagChart: 'production_packing_cap_1_total',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'percentage',
          title: 'Cap 1 - Total Percent Defects',
          maxKey: 'MaxValuePercentage',
          minKey: 'MinValuePercentage',
          avgKey: 'AvgValuePercentage',
          tagChart: 'production_packing_cap_1_percentage',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingCap1(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_cap_2') {
      this.dataSections.push(
        {
          data: 'total',
          title: 'Cap 2 - Total Number Defects',
          maxKey: 'MaxValueTotal',
          minKey: 'MinValueTotal',
          avgKey: 'AvgValueTotal',
          tagChart: 'production_packing_cap_2_total',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'percentage',
          title: 'Cap 2 - Total Percent Defects',
          maxKey: 'MaxValuePercentage',
          minKey: 'MinValuePercentage',
          avgKey: 'AvgValuePercentage',
          tagChart: 'production_packing_cap_2_percentage',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingCap2(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_rsb') {
      this.dataSections.push(
        {
          data: 'total',
          title: 'RSB - Total Number Defects',
          maxKey: 'MaxValueTotal',
          minKey: 'MinValueTotal',
          avgKey: 'AvgValueTotal',
          tagChart: 'production_packing_rsb_total',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'percentage',
          title: 'RSB - Total Percent Defects',
          maxKey: 'MaxValuePercentage',
          minKey: 'MinValuePercentage',
          avgKey: 'AvgValuePercentage',
          tagChart: 'production_packing_rsb_percentage',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingRsb(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_packing_other') {
      this.dataSections.push(
        {
          data: 'total_inspection',
          title: 'Other - Total Amount of Inspection',
          maxKey: 'MaxValueTotalInspection',
          minKey: 'MinValueTotalInspection',
          avgKey: 'AvgValueTotalInspection',
          tagChart: 'production_packing_other_total_inspection',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'total_fng',
          title: 'Other - F-NG',
          maxKey: 'MaxValueFNG',
          minKey: 'MinValueFNG',
          avgKey: 'AvgValueFNG',
          tagChart: 'production_packing_other_f_ng',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPackingOther(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    }
  }

  fetchDataMinMaxProductionPackingMeasured(data_item: any) {
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
            this.dataMinMaxProductionPackingMeasured = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingMeasured = [];
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

  fetchDataMinMaxProductionPackingInternalPressure(data_item: any) {
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
            this.dataMinMaxProductionPackingInternalPressure = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingInternalPressure = [];
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

  fetchDataMinMaxProductionPackingInternalPressureJudmentValue(data_item: any) {
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
            this.dataMinMaxProductionPackingInternalPressureJudmentValue = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingInternalPressureJudmentValue = [];
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

  fetchDataMinMaxProductionPackingDetailsDefectives(data_item: any) {
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
            this.dataMinMaxProductionPackingDetailsDefectives = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingDetailsDefectives = [];
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

  fetchDataMinMaxProductionPackingCap1(data_item: any) {
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
            this.dataMinMaxProductionPackingCap1 = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingCap1 = [];
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

  fetchDataMinMaxProductionPackingCap2(data_item: any) {
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
            this.dataMinMaxProductionPackingCap2 = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingCap2 = [];
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

  fetchDataMinMaxProductionPackingRsb(data_item: any) {
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
            this.dataMinMaxProductionPackingRsb = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingRsb = [];
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

  fetchDataMinMaxProductionPackingOther(data_item: any) {
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
            this.dataMinMaxProductionPackingOther = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionPackingOther = [];
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

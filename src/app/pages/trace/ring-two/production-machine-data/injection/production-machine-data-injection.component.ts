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
  selector: 'app-production-machine-data-injection',
  templateUrl: './production-machine-data-injection.component.html',
  styleUrls: ['./production-machine-data-injection.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class ProductionMachineDataInjectionComponent {
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
  dataMinMaxProductionInjectionEjectorForward: any = [];
  dataMinMaxProductionInjectionEjectorBack: any = [];
  dataMinMaxProductionInjectionEjectorBooster: any = [];
  dataMinMaxProductionInjectionCooling: any = [];
  dataMinMaxProductionInjectionHold: any = [];
  dataMinMaxProductionInjectionFastFill: any = [];
  dataMinMaxProductionInjectionRobot: any = [];
  dataMinMaxProductionInjectionMoldPosition: any = [];
  dataMinMaxProductionInjectionOther: any = [];
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
    this.onTabChangeProductionMachine('production_injection_ejector_forward');
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
    if (section == 'production_injection_ejector_forward') {
      this.dataSections.push(
        {
          data: 'position',
          title: 'Ejector Forward - Position',
          maxKey: 'MaxValuePosition',
          minKey: 'MinValuePosition',
          avgKey: 'AvgValuePosition',
          tagChart: 'production_injection_ejector_forward_position',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'speed',
          title: 'Ejector Forward - Speed',
          maxKey: 'MaxValueSpeed',
          minKey: 'MinValueSpeed',
          avgKey: 'AvgValueSpeed',
          tagChart: 'production_injection_ejector_forward_speed',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'force',
          title: 'Ejector Forward - Force',
          maxKey: 'MaxValueForce',
          minKey: 'MinValueForce',
          avgKey: 'AvgValueForce',
          tagChart: 'production_injection_ejector_forward_force',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionEjectorForward(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_ejector_back') {
      this.dataSections.push(
        {
          data: 'position',
          title: 'Ejector Back - Position',
          maxKey: 'MaxValuePosition',
          minKey: 'MinValuePosition',
          avgKey: 'AvgValuePosition',
          tagChart: 'production_injection_ejector_back_position',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'speed',
          title: 'Ejector Back - Speed',
          maxKey: 'MaxValueSpeed',
          minKey: 'MinValueSpeed',
          avgKey: 'AvgValueSpeed',
          tagChart: 'production_injection_ejector_back_speed',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'force',
          title: 'Ejector Back - Force',
          maxKey: 'MaxValueForce',
          minKey: 'MinValueForce',
          avgKey: 'AvgValueForce',
          tagChart: 'production_injection_ejector_back_force',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionEjectorBack(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_ejector_booster') {
      this.dataSections.push({
        data: 'position',
        title: 'Ejector Booster - Position',
        maxKey: 'MaxValuePosition',
        minKey: 'MinValuePosition',
        avgKey: 'AvgValuePosition',
        tagChart: 'production_injection_ejector_booster_position',
        color: 'biru',
        colorCode: '#6bc4ff',
      });
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionEjectorBooster(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_cooling') {
      this.dataSections.push(
        {
          data: 'normal_cycle',
          title: 'Injection Cooling - Normal Cycle',
          maxKey: 'MaxValueNormalCycle',
          minKey: 'MinValueNormalCycle',
          avgKey: 'AvgValueNormalCycle',
          tagChart: 'production_injection_cooling_normal_cycle',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'extended_cycle',
          title: 'Injection Cooling - Extended Cycle',
          maxKey: 'MaxValueExtendedCycle',
          minKey: 'MinValueExtendedCycle',
          avgKey: 'AvgValueExtendedCycle',
          tagChart: 'production_injection_cooling_extended_cycle',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionCooling(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_hold') {
      this.dataSections.push(
        {
          data: 'pressure_1',
          title: 'Injection Hold - Pressure 1',
          maxKey: 'MaxValuePressure1',
          minKey: 'MinValuePressure1',
          avgKey: 'AvgValuePressure1',
          tagChart: 'production_injection_hold_pressure_1',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'pressure_2',
          title: 'Injection Hold - Pressure 2',
          maxKey: 'MaxValuePressure2',
          minKey: 'MinValuePressure2',
          avgKey: 'AvgValuePressure2',
          tagChart: 'production_injection_hold_pressure_2',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'pressure_3',
          title: 'Injection Hold - Pressure 3',
          maxKey: 'MaxValuePressure3',
          minKey: 'MinValuePressure3',
          avgKey: 'AvgValuePressure3',
          tagChart: 'production_injection_hold_pressure_3',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'timing_pressure_1',
          title: 'Injection Hold - Timing Pressure 1',
          maxKey: 'MaxValueTimingPressure1',
          minKey: 'MinValueTimingPressure1',
          avgKey: 'AvgValueTimingPressure1',
          tagChart: 'production_injection_hold_timing_pressure_1',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'timing_pressure_2',
          title: 'Injection Hold - Timing Pressure 2',
          maxKey: 'MaxValueTimingPressure2',
          minKey: 'MinValueTimingPressure2',
          avgKey: 'AvgValueTimingPressure2',
          tagChart: 'production_injection_hold_timing_pressure_2',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'timing_pressure_3',
          title: 'Injection Hold - Timing Pressure 3',
          maxKey: 'MaxValueTimingPressure3',
          minKey: 'MinValueTimingPressure3',
          avgKey: 'AvgValueTimingPressure3',
          tagChart: 'production_injection_hold_timing_pressure_3',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'hold_time',
          title: 'Injection Hold - Time',
          maxKey: 'MaxValueTime',
          minKey: 'MinValueTime',
          avgKey: 'AvgValueTime',
          tagChart: 'production_injection_hold_time',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionHold(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_fast_fill') {
      this.dataSections.push(
        {
          data: 'fast_fill_speed',
          title: 'Injection Fast Fill - Speed',
          maxKey: 'MaxValueSpeed',
          minKey: 'MinValueSpeed',
          avgKey: 'AvgValueSpeed',
          tagChart: 'production_injection_fast_fill_speed',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'fast_fill_volume',
          title: 'Injection Fast Fill - Volume',
          maxKey: 'MaxValueVolume',
          minKey: 'MinValueVolume',
          avgKey: 'AvgValueVolume',
          tagChart: 'production_injection_fast_fill_volume',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'fast_fill_pressure',
          title: 'Injection Fast Fill - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'production_injection_fast_fill_pressure',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionFastFill(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_robot') {
      this.dataSections.push(
        {
          data: 'vertical_position',
          title: 'Robot - Vertical Position',
          maxKey: 'MaxValueVerticalPosition',
          minKey: 'MinValueVerticalPosition',
          avgKey: 'AvgValueVerticalPosition',
          tagChart: 'production_injection_robot_vertical_position',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'horizontal_position',
          title: 'Robot - Horizontal Position',
          maxKey: 'MaxValueHorizontalPosition',
          minKey: 'MinValueHorizontalPosition',
          avgKey: 'AvgValueHorizontalPosition',
          tagChart: 'production_injection_robot_horizontal_position',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'first_stage_position',
          title: 'Robot - First Stage Position',
          maxKey: 'MaxValueFirstStagePosition',
          minKey: 'MinValueFirstStagePosition',
          avgKey: 'AvgValueFirstStagePosition',
          tagChart: 'production_injection_robot_first_stage_position',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'mold_position',
          title: 'Robot - Mold Position',
          maxKey: 'MaxValueMoldPosition',
          minKey: 'MinValueMoldPosition',
          avgKey: 'AvgValueMoldPosition',
          tagChart: 'production_injection_robot_mold_position',
          color: 'orange',
          colorCode: '#ffe66a',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionRobot(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_mold_position') {
      this.dataSections.push(
        {
          data: 'safe_to_enter',
          title: 'Mold Position For T/P Safe to Enter',
          maxKey: 'MaxValueSafeToEnter',
          minKey: 'MinValueSafeToEnter',
          avgKey: 'AvgValueSafeToEnter',
          tagChart: 'production_injection_mold_position_safe_to_enter',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'safe_to_rotate',
          title: 'Mold Position For Coolpick Safe to Rotate',
          maxKey: 'MaxValueSafeToRotate',
          minKey: 'MinValueSafeToRotate',
          avgKey: 'AvgValueSafeToRotate',
          tagChart: 'production_injection_mold_position_safe_to_rotate',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionMoldPosition(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_others') {
      this.dataSections.push(
        {
          data: 'tonnage',
          title: 'Tonnage',
          maxKey: 'MaxValueTonnage',
          minKey: 'MinValueTonnage',
          avgKey: 'AvgValueTonnage',
          tagChart: 'production_injection_other_tonnage',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'screw_rotation_speed',
          title: 'Screw Rotation Speed',
          maxKey: 'MaxValueScrewRotationSpeed',
          minKey: 'MinValueScrewRotationSpeed',
          avgKey: 'AvgValueScrewRotationSpeed',
          tagChart: 'production_injection_other_screw_rotation_speed',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'paleticizing',
          title: 'Paleticizing',
          maxKey: 'MaxValuePaleticizing',
          minKey: 'MinValuePaleticizing',
          avgKey: 'AvgValuePaleticizing',
          tagChart: 'production_injection_other_paleticizing',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'carriage',
          title: 'Carriage',
          maxKey: 'MaxValueCarriage',
          minKey: 'MinValueCarriage',
          avgKey: 'AvgValueCarriage',
          tagChart: 'production_injection_other_carriage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'safe_to_exit',
          title: 'Ejector Position For Coolpick Safe to Exit',
          maxKey: 'MaxValueSafeToExit',
          minKey: 'MinValueSafeToExit',
          avgKey: 'AvgValueSafeToExit',
          tagChart: 'production_injection_other_safe_to_exit',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'tooling_plate_out',
          title: 'Tooling Plate Out of Mold Area',
          maxKey: 'MaxValueToolingPlateOut',
          minKey: 'MinValueToolingPlateOut',
          avgKey: 'AvgValueToolingPlateOut',
          tagChart: 'production_injection_other_tooling_plate_out',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'cycle_tyme',
          title: 'Cycle Time',
          maxKey: 'MaxValueCycleTime',
          minKey: 'MinValueCycleTime',
          avgKey: 'AvgValueCycleTime',
          tagChart: 'production_injection_other_cycle_type',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionInjectionOther(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    }
  }

  fetchDataMinMaxProductionInjectionEjectorForward(data_item: any) {
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
            this.dataMinMaxProductionInjectionEjectorForward = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionEjectorForward = [];
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
  fetchDataMinMaxProductionInjectionEjectorBack(data_item: any) {
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
            this.dataMinMaxProductionInjectionEjectorBack = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionEjectorBack = [];
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

  fetchDataMinMaxProductionInjectionEjectorBooster(data_item: any) {
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
            this.dataMinMaxProductionInjectionEjectorBooster = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionEjectorBooster = [];
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

  fetchDataMinMaxProductionInjectionCooling(data_item: any) {
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
            this.dataMinMaxProductionInjectionCooling = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionCooling = [];
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

  fetchDataMinMaxProductionInjectionHold(data_item: any) {
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
            this.dataMinMaxProductionInjectionHold = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionHold = [];
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

  fetchDataMinMaxProductionInjectionFastFill(data_item: any) {
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
            this.dataMinMaxProductionInjectionFastFill = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionFastFill = [];
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

  fetchDataMinMaxProductionInjectionRobot(data_item: any) {
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
            this.dataMinMaxProductionInjectionRobot = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionRobot = [];
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

  fetchDataMinMaxProductionInjectionMoldPosition(data_item: any) {
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
            this.dataMinMaxProductionInjectionMoldPosition = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionMoldPosition = [];
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

  fetchDataMinMaxProductionInjectionOther(data_item: any) {
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
            this.dataMinMaxProductionInjectionOther = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionInjectionOther = [];
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

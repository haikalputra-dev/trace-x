import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { DataService } from './data.service';
@Component({
  selector: 'app-machine-detail-ring-two',
  templateUrl: './machine-detail-ring-two.component.html',
  styleUrls: ['./machine-detail-ring-two.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class MachineDetailRingTwoComponent {
  simpleDonutChart: any;
  activeTab: number = 1;
  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  listData = [];

  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  statusForm: any;
  dataMasterAuthorization = [];
  idEdit: any;
  typeaheadEmployee = new EventEmitter<string>();
  dataEmployee = [];
  dataPreparation: any[] = [];
  dataInjection: any[] = [];
  dataBlow: any[] = [];
  dataFiller: any[] = [];
  dataLN2: any[] = [];
  dataCAPER: any[] = [];
  dataCSC: any[] = [];
  dataLabel: any[] = [];
  dataCaser: any[] = [];
  constructor(
    public service: AppService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  searchData: any;
  @ViewChild('modalForm') modalForm: TemplateRef<any> | undefined;
  ngOnInit() {
    this._simpleDonutChart();
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }
    this.searchData = history.state.data;
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Machine Ring Two', active: true },
    ];
    this.dataPreparation = this.dataService.getDataPreparation().data;
    this.dataInjection = this.dataService.getDataInjection().data;
    this.dataBlow = this.dataService.getDataBlow().data;
    this.dataFiller = this.dataService.getDataFiller().data;
    this.dataLN2 = this.dataService.getDataFLN2().data;
    this.dataCAPER = this.dataService.getDataCaper().data;
    this.dataCSC = this.dataService.getDataCSC().data;
    this.dataLabel = this.dataService.getDataLabel().data;
    this.dataCaser = this.dataService.getDataCaser().data;
  }

  navigateToBack() {
    const searchData = this.searchData;
    this.router.navigate(['/protrace/general-information'], {
      state: { searchData },
    });
  }

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange() {
    this.startIndex = 1;
    this.endIndex = this.pageSize;
  }

  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.totalRecords);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  private generateGradientColors(
    series: number[],
    startColor: string,
    endColor: string
  ): string[] {
    const start = this.hexToRgb(startColor);
    const end = this.hexToRgb(endColor);

    if (!start || !end) {
      console.error('Invalid Color');
      return ['#FFFFFF'];
    }

    const steps = series.length;
    const colors = [];

    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const r = Math.round(start.r * (1 - ratio) + end.r * ratio);
      const g = Math.round(start.g * (1 - ratio) + end.g * ratio);
      const b = Math.round(start.b * (1 - ratio) + end.b * ratio);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
  }
  private hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private _simpleDonutChart() {
    const series = [19, 5, 5, 5, 5, 5, 10, 10, 10, 10, 16];
    const startColor = '#132492';
    const endColor = '#687CFE';
    const colors = this.generateGradientColors(series, startColor, endColor);

    this.simpleDonutChart = {
      series: [19, 5, 5, 5, 5, 5, 40, 16, 10],
      labels: [
        'Preparation',
        'Injection',
        'Blow',
        'Filler',
        'LN2',
        'Caper',
        'CSC',
        'Label',
        'Caser',
      ],
      chart: {
        type: 'donut',
        height: 220,
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 0,
          donut: {
            size: '80%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                offsetY: -5,
              },
              value: {
                show: true,
                fontSize: '20px',
                color: '#343a40',
                fontWeight: 500,
                offsetY: 5,
                formatter: function (val: any) {
                  return val + '%';
                },
              },
              total: {
                show: true,
                fontSize: '13px',
                label: 'Total',
                color: '#9599ad',
                fontWeight: 500,
                formatter: function () {
                  return '100%';
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value + '%';
          },
        },
      },
      stroke: {
        lineCap: 'round',
        width: 2,
      },
      colors: colors,
    };
  }
}

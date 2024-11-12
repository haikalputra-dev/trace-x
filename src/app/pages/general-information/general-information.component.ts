import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
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
import { slideInLeft, slideInRight } from 'src/app/utils/animation';
import { AppService } from 'src/app/shared/service/app.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss'],
  animations: [slideInLeft, slideInRight],
})
export class GeneralInformationComponent {
  @ViewChildren('chart') charts: QueryList<ChartComponent> | undefined;
  breadCrumbItems!: Array<{}>;
  simpleDonutChart: any;
  simpleDonutChart2: any;
  simpleDonutChart3: any;
  simpleDonutChart4: any;
  simpleDonutChart5: any;
  searchData: any;
  dataProduct: any;
  productImage: any;
  productName: any;
  productDate: any;
  productProdStart: any;
  productProdEnd: any;
  productQuantity: any;
  productEfficiency: any;
  productRejection: any;
  lotNo: any;
  url: any;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public service: AppService
  ) {}
  ngOnInit(): void {
    this.url = this.service.url();
    const storedData = localStorage.getItem('product');
    if (storedData) {
      this.searchData = JSON.parse(storedData);
      console.log(this.searchData);
      this.productImage = this.searchData.productImage;
      this.productName = this.searchData.productName;
      this.lotNo = this.searchData.dataProdidentity.lotno;
      console.log(this.searchData.dataProdidentity);
      this.productDate = this.formatDate(this.searchData.dataProdidentity.tgl);
      this.productProdEnd = this.formatDateTime(
        this.searchData.dataProdidentity.prod_end
      );
      this.productProdStart = this.formatDateTime(
        this.searchData.dataProdidentity.prod_start
      );
      this.productQuantity = this.searchData.dataProdidentity.quantity;
      console.log(this.productImage);

      this.service
        .post(`/data/efficiency`, {
          lotno: this.lotNo,
          pro_order: this.searchData.dataProdidentity.prod_order,
          line: this.searchData.dataProdidentity.line,
          tag: 'efficiency_rejection',
        })
        .subscribe(
          (data: any) => {
            console.log(data);
            const responseData = data.data[0];

            this.productEfficiency =
              responseData.Efficiency != null
                ? `${responseData.Efficiency} %`
                : '-';
            this.productRejection =
              responseData.Rejection != null
                ? `${responseData.Rejection} %`
                : '-';
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('oke');
      this.router.navigate(['/traceability']);
    }
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'General Information', active: true },
    ];
    this._simpleDonutChart();
    this._simpleDonutChartRing2();
    this._simpleDonutChartRing3();
    this._simpleDonutChartRing4();
    this._simpleDonutChartRing5();
    this.searchData = history.state.searchData;
    // console.log('Received search data:', this.searchData);
    // if (this.searchData) {
    //   console.log(this.searchData.productCode);
    //   this.service
    //     .get(`/master/products/code/${this.searchData.productCode}`)
    //     .subscribe(
    //       (data) => {
    //         console.log(data);
    //         this.dataProduct = data.data[0];
    //         this.dataProduct = data.data[0];
    //         console.log(this.dataProduct);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    // }
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  onTabChange(event: any) {
    console.log(event);
    setTimeout(() => {
      this.charts!.forEach((chart) => chart.updateSeries(chart.series));
      console.log(this.charts);
      this.cdr.detectChanges();
    }, 200);
  }

  navigateTo(path: string) {
    const data = this.searchData;
    console.log(data);
    this.router.navigate([path], {
      state: { data },
    });
  }

  navigateToBack() {
    this.navigateTo('/traceability');
  }

  navigateToDetailRingOne() {
    this.navigateTo('/protrace/detail/ring-one');
  }

  navigateToDetailRingTwo() {
    this.navigateTo('/protrace/detail/ring-two');
  }

  navigateToDetailRingThree() {
    this.navigateTo('/protrace/detail/ring-three');
  }

  navigateToDetailMachineRingOne() {
    this.navigateTo('/protrace/detail/machine/ring-one');
  }

  navigateToDetailMachineRingTwo() {
    this.navigateTo('/protrace/detail/machine/ring-two');
  }

  formatDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  formatDate(dateString: any) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
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

    return series.map((_, i, arr) => {
      const ratio = i / (arr.length - 1);
      const r = Math.round(start.r * (1 - ratio) + end.r * ratio);
      const g = Math.round(start.g * (1 - ratio) + end.g * ratio);
      const b = Math.round(start.b * (1 - ratio) + end.b * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    });
  }

  private hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private _createDonutChart(
    series: number[],
    labels: string[],
    startColor: string,
    endColor: string,
    chartProperty: keyof GeneralInformationComponent
  ) {
    const colors = this.generateGradientColors(series, startColor, endColor);

    this[chartProperty] = {
      series,
      labels,
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
                formatter: (val: any) => `${val}%`,
              },
              total: {
                show: true,
                fontSize: '13px',
                label: 'Total',
                color: '#9599ad',
                fontWeight: 500,
                formatter: () => '100%',
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
          formatter: (value: any) => `${value}%`,
        },
      },
      stroke: {
        lineCap: 'round',
        width: 2,
      },
      colors,
    };
  }

  private _simpleDonutChart() {
    this._createDonutChart(
      [19, 5, 5, 5, 5, 5, 40, 16, 10, 10],
      [
        'IPC Quality Result',
        'Microbiology Result',
        'Bottle Dimension Result',
        'Capping Performance Result',
        'Preform Check Result',
        'CCP Result',
        'Preparation Syrup Result',
        'Abnormally Result',
        'Bottle Pressure Result',
        'Packaging Material Result',
      ],
      '#132492',
      '#687CFE',
      'simpleDonutChart'
    );
  }

  private _simpleDonutChartRing2() {
    this._createDonutChart(
      [19, 5, 5, 5, 5, 5, 40],
      [
        'Machine Performance',
        'Report Inspection External',
        'Cleaning & Sanitation Result',
        'Inspection Result Camera',
        'Inspection External Result',
        'Water Performance Result',
        'Utility Performance Result',
      ],
      '#132492',
      '#687CFE',
      'simpleDonutChart2'
    );
  }

  private _simpleDonutChartRing3() {
    this._createDonutChart(
      [19, 5, 5],
      [
        'Product Pallet Identification',
        'Product Destination Identification',
        'Trucking Identification',
      ],
      '#132492',
      '#687CFE',
      'simpleDonutChart3'
    );
  }

  private _simpleDonutChartRing4() {
    this._createDonutChart(
      [19, 5, 5, 10, 25],
      ['Filler', 'Blow', 'Injection', 'Caser', 'Packing', 'Preparation'],
      '#132492',
      '#687CFE',
      'simpleDonutChart4'
    );
  }

  private _simpleDonutChartRing5() {
    this._createDonutChart(
      [19, 5, 5, 10, 25],
      [
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
      '#132492',
      '#687CFE',
      'simpleDonutChart5'
    );
  }
}

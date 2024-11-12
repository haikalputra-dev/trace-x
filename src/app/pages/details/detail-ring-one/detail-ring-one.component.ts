import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

Exporting(Highcharts);
@Component({
  selector: 'app-detail-ring-one',
  templateUrl: './detail-ring-one.component.html',
  styleUrls: ['./detail-ring-one.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class DetailRingOneComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'start_time',
    'end_time',
    'alarm_code',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  formatColumn(input: string) {
    let words = input.split('_');
    if (words.length > 1) {
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      return words.join(' ');
    } else if (words.length === 1) {
      return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    } else {
      return '';
    }
  }
  dataResultAbnormallyChart: any;
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

  isTabActive: boolean = false;
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

  activeTabIpc: string = 'Filling Volume'; // Set default active tab
  toggleTabIpc(jenis_uji: any, tags: any): void {
    this.listData = []
    this.dataSearch = []
    this.activeTabIpc = jenis_uji; // Set the active tab
    this.spinner.show();
    this.service
      .post(`/data/resultipcquality/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: tags,
        ring: '1',
        type_data: 'Table',
        pro_fg: this.searchData.dataProdidentity.prod_order
      })
      .subscribe(
        (data: any) => {
          if (data.success) {
            console.log(data);
            this.listData = data.data;
            console.log(this.listData);
            this.dataSearch = data.data;
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

  toggleTabBottleDimension(section: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    // Update the dynamic header
    this.setDynamicField(section)
    
    this.service
      .post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_bottle_dimension',
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.listData = response.data;
            this.dataSearch = response.data;
            this.totalRecords = this.listData.length;

            console.log(response);                // Full response
            console.log(response.data[0]); 
            
            this.setPaginationData();             // Set pagination for the table

            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  toggleTabCappingPerformance(section: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    // Update the dynamic header
    this.setDynamicField(section)
    
    this.service
      .post(`/data/resultcappingperformance/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_capping_performance',
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.listData = response.data;
            this.dataSearch = response.data;
            this.totalRecords = this.listData.length;

            console.log(response);                // Full response
            console.log(response.data[0]); 
            this.setPaginationData();             // Set pagination for the table

            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }


  toggleTabPreformCheck(section: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    // Update the dynamic header
    this.setDynamicField(section)
    
    this.service
      .post(`/data/resultpreformcheck/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_preform_check',
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.listData = response.data;
            this.dataSearch = response.data;
            this.totalRecords = this.listData.length;

            console.log(response);                // Full response
            console.log(response.data[0]); 
            this.setPaginationData();             // Set pagination for the table

            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  chartDataCCP: Highcharts.Options = {};

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
  dataSearch: any;

  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  statusForm: any;
  dataMasterAuthorization = [];
  data = [];
  idEdit: any;
  typeaheadEmployee = new EventEmitter<string>();
  dataEmployee = [];

  dynamicHeader:string = ''
  dynamicField:string = ''
  dynamicFieldData:any
  isDynamicFieldArray: boolean = false;

  dataResultCCP: any;
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

  formatSymbol(symbol: any): string {
    // Check if symbol is undefined or null
    if (!symbol) {
      return 'N/A';  // Return a default value if symbol is not valid
    }
  
    // Replace known HTML entities with the correct symbol
    if (symbol.includes("&lt;=")) {
      return symbol.replace("&lt;=", "≤");
    } else if (symbol.includes("&gt;=")) {
      return symbol.replace("&gt;=", "≥");
    } else if (symbol.includes("&lt;")) {
      return symbol.replace("&lt;", "<");
    } else if (symbol.includes("&gt;")) {
      return symbol.replace("&gt;", ">");
    }
    // If no matches, return the symbol as is
    return symbol;
  }
  
  setDynamicField(section: any) {
    this.dynamicHeader = section.title;
    this.dynamicField = section.stdKey;
  
    if (section.data_items) {
      this.dynamicFieldData = section.data_items;
      console.log("ini field data: " + this.dynamicFieldData);
      
      this.isDynamicFieldArray = true;  // Set flag to true if it's an array
    } else {
      this.dynamicFieldData = section.data_item;
      this.isDynamicFieldArray = false;  // Set flag to false if it's a single value
    }
  }
  
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

  dataSectionsBottleDimension = [
    {
      title: 'Bottle Weight',
      data_item: 'bottle_weight',
      maxKey: 'result_max_bw',
      minKey: 'result_min_bw',
      avgKey: 'result_avg_bw',
      stdKey: 'std_bw',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Brimful Volume',
      data_item: 'brimful_vol',
      maxKey: 'result_max_brimful',
      minKey: 'result_min_brimful',
      avgKey: 'result_avg_brimful',
      stdKey: 'std_brimful_vol',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Section Weight (Top)',
      data_item: 'top_w',
      maxKey: 'result_max_top_w',
      minKey: 'result_min_top_w',
      avgKey: 'result_avg_top_w',
      stdKey: 'std_top_w',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Section Weight (Middle)',
      data_item: 'mid_w',
      maxKey: 'result_max_mid_w',
      minKey: 'result_min_mid_w',
      avgKey: 'result_avg_mid_w',
      stdKey: 'std_mid_w',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Section Weight (Bottom)',
      data_item: 'bot_w',
      maxKey: 'result_max_bot_w',
      minKey: 'result_min_bot_w',
      avgKey: 'result_avg_bot_w',
      stdKey: 'std_bot_w',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Bottle Height',
      data_item: 'bottle_height',
      maxKey: 'result_max_height',
      minKey: 'result_min_height',
      avgKey: 'result_avg_height',
      stdKey: 'std_btl_height',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Section Weight (Top)',
      data_item: 'top_d',
      maxKey: 'result_max_top_d',
      minKey: 'result_min_top_d',
      avgKey: 'result_avg_top_d',
      stdKey: 'std_top_d',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Section Weight (Middle)',
      data_item: 'mid_d',
      maxKey: 'result_max_mid_d',
      minKey: 'result_min_mid_d',
      avgKey: 'result_avg_mid_d',
      stdKey: 'std_mid_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Section Weight (Bottom)',
      data_item: 'bot_d',
      maxKey: 'result_max_bot_d',
      minKey: 'result_min_bot_d',
      avgKey: 'result_avg_bot_d',
      stdKey: 'std_bot_d',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Gate Height',
      data_item: 'gate_height',
      maxKey: 'result_max_gh',
      minKey: 'result_min_gh',
      avgKey: 'result_avg_gh',
      stdKey: 'std_gh',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    // {
    //   data_item: 'predis_residual',
    //   title: 'Predis Residual',
    //   maxKey: 'max_residual',
    //   minKey: 'min_residual',
    //   avgKey: 'result_avg_gh',
    //   stdKey: 'std_gh',
    //   color: 'biru',
    //   colorCode: '#6bc4ff',
    // }
  ];

  dataSectionsCappingPerformance = [
    {
      title: 'Capping',
      data_item: 'ca',
      maxKey: 'result_max_ca',
      minKey: 'result_min_ca',
      avgKey: 'result_avg_ca',
      stdKey: 'std_ca',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: '1st',
      data_item: '1st',
      maxKey: 'result_max_1st',
      minKey: 'result_min_1st',
      avgKey: 'result_avg_1st',
      stdKey: 'std_1st',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: '2nd',
      data_item: '2nd',
      maxKey: 'result_max_2nd',
      minKey: 'result_min_2nd',
      avgKey: 'result_avg_2nd',
      stdKey: 'std_2nd',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Leak',
      data_item: 'leak',
      maxKey: 'result_max_leak',
      minKey: 'result_min_leak',
      avgKey: 'result_avg_leak',
      stdKey: 'std_l',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Break',
      data_item: 'break',
      maxKey: 'result_max_break',
      minKey: 'result_min_break',
      avgKey: 'result_avg_break',
      stdKey: 'std_b',
      color: 'purple',
      colorCode: '#b08fff',
    }
  ]

  dataSectionsPreformCheck = [
    {
      title: 'Weight',
      data_item: 'weight',
      maxKey: 'result_max_weight',
      minKey: 'result_min_weight',
      avgKey: 'result_avg_weight',
      stdKey: 'pf_weight',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Height',
      data_item: 'height',
      maxKey: 'result_max_height',
      minKey: 'result_min_height',
      avgKey: 'result_avg_height',
      stdKey: 'std_height',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Bead Height',
      data_items: ['bead_h1','bead_h2','bead_h3','bead_h4'],
      maxKey: 'result_max_bead_h',
      minKey: 'result_min_bead_h',
      avgKey: 'result_avg_bead_h',
      stdKey: 'std_bead_h',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Inside Diameter',
      data_items: ['inside_diameter1','inside_diameter2','inside_diameter3','inside_diameter4'],
      maxKey: 'result_max_inside_diameter',
      minKey: 'result_min_inside_diameter',
      avgKey: 'result_avg_inside_diameter',
      stdKey: 'inside_diameter',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Outside Diameter',
      data_items: ['outside_diameter1','outside_diameter2'],
      maxKey: 'result_max_outside_diameter',
      minKey: 'result_min_outside_diameter',
      avgKey: 'result_avg_outside_diameter',
      stdKey: 'outside_diameter',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Screw Tread',
      data_items: ['screw_tread_d1','screw_tread_d2'],
      maxKey: 'result_max_screw_tread_d',
      minKey: 'result_min_screw_tread_d',
      avgKey: 'result_avg_screw_tread_d',
      stdKey: 'std_screw_tread_d',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Bead Diameter',
      data_items: ['bead_d1', 'bead_d2'],
      maxKey: 'result_max_bead_d',
      minKey: 'result_min_bead_d',
      avgKey: 'result_avg_bead_d',
      stdKey: 'std_bead_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Support Ring Height',
      data_items: ['support_ring_height_h1','support_ring_height_h2','support_ring_height_h3','support_ring_height_h4'],
      maxKey: 'result_max_support_ring_height_h',
      minKey: 'result_min_support_ring_height_h',
      avgKey: 'result_avg_support_ring_height_h',
      stdKey: 'std_support_ring_height_h',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Support Ring Diameter',
      data_items: ['support_ring_height_d1','support_ring_height_d2'],
      maxKey: 'result_max_support_ring_height_d',
      minKey: 'result_min_support_ring_height_d',
      avgKey: 'result_avg_support_ring_height_d',
      stdKey: 'std_support_ring_height_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Thickness',
      data_items: ['min_thickness','max_thickness'],
      maxKey: 'result_max_thickness',
      minKey: 'result_min_thickness',
      avgKey: 'result_avg_thickness',
      stdKey: 'std_thickness',
      color: 'purple',
      colorCode: '#b08fff',
    },
  ]


  constructor(
    public service: AppService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
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
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  public formData = this.formBuilder.group({
    employee_code: [null, [Validators.required]],
    employee_name: [null, [Validators.required]],
    role: [null, [Validators.required]],
    site: [null],
  });

  get form() {
    return this.formData.controls;
  }
  dataProduct: any;
  productLotNo: any;
  searchData: any;
  activeTitle: any;
  @ViewChild('modalForm') modalForm: TemplateRef<any> | undefined;
  ngOnInit() {
    this._simpleDonutChart();
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
    console.log(history.state);
    console.log(this.searchData);
    this.breadCrumbItems = [
      { label: 'Traceability' },
      { label: 'Detail' },
      { label: 'Ring One', active: true },
    ];

    if (this.searchData) {
      this.fetchDataResultIpcQuality('result_ipcquality_fillingVolume');
    } else {
      console.log('Waiting for searchData to be available');
      // Handle delayed initialization if necessary
    }
  }

  // transformData(data: any[]): any[] {
  //   return data.map((item) => {
  //     return {
  //       x: new Date(item.tanggal).getTime(),
  //       y: this.formatNumber(item.data),
  //     };
  //   });
  // }

  transformData(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
  }
  chartRendered = false;

  dataStandard: any;

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
  changeChart(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    console.log(this.formatNumber(this.dataResultCCP[section.minKey]));
    const min = this.formatNumber(this.dataResultCCP[section.minKey]);
    const max = this.formatNumber(this.dataResultCCP[section.maxKey]);
    console.log(min);
    console.log(max);
    console.log(this.dataResultCCP);
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

            console.log(minAsal, maxAsal, transformedData);
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
            // this.chartDataCCP.series = [
            //   {
            //     name: 'Data',
            //     data: transformedData,
            //   },
            // ];
            // this.chartDataCCP.colors = [section.colorCode];
            // this.dataStandard = data.data.dataStandard;
            // this.chartDataCCP.annotations.yaxis[0].y = this.dataStandard.min;
            // this.chartDataCCP.annotations.yaxis[1].y = this.dataStandard.max;
            // const minValueY = this.dataStandard.min;
            // const maxValueY = this.dataStandard.max;
            // const rangeY = maxValueY - minValueY;
            // const bufferY = rangeY * 0.1;
            // const yAxisMin = minValueY - bufferY;
            // const yAxisMax = maxValueY + bufferY;

            // this.chartDataCCP.yaxis = {
            //   min: yAxisMin,
            //   max: yAxisMax,
            // };

            // console.log('Chart updated with data:', this.chartDataCCP);

            // this.chartDataCCP.series = [
            //   {
            //     type: 'area',
            //     name: 'Data',
            //     data: transformedData,
            //   },
            // ];

            // this.chartDataCCP.colors = [section.colorCode];

            // // Update yAxis plotLines
            // this.chartDataCCP.yAxis = {
            //   ...(this.chartDataCCP.yAxis as Highcharts.YAxisOptions),
            //   plotLines: [
            //     {
            //       value: this.dataStandard.min,
            //       color: '#FF4560',
            //       width: 2,
            //       label: {
            //         text: 'Min',
            //         align: 'right',
            //         style: {
            //           color: '#FF4560',
            //         },
            //       },
            //     },
            //     {
            //       value: this.dataStandard.max,
            //       color: '#00E396',
            //       width: 2,
            //       label: {
            //         text: 'Max',
            //         align: 'right',
            //         style: {
            //           color: '#00E396',
            //         },
            //       },
            //     },
            //   ],
            // };

            // // Update yAxis min and max
            // const minValueY = this.dataStandard.min;
            // const maxValueY = this.dataStandard.max;
            // const rangeY = maxValueY - minValueY;
            // const bufferY = rangeY * 0.1;
            // (this.chartDataCCP.yAxis as Highcharts.YAxisOptions).min =
            //   minValueY - bufferY;
            // (this.chartDataCCP.yAxis as Highcharts.YAxisOptions).max =
            //   maxValueY + bufferY;

            // // Force chart update
            // this.chartDataCCP = { ...this.chartDataCCP };
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

  fetchDataResultIpcQuality(data_item: any) {
    let dataIpcQuality: any
    console.log(data_item);
    this.spinner.show();
    console.log("pro_fg : ", this.searchData.dataProdidentity.prod_order);
    this.service
      .post(`/data/resultipcquality/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item,
        ring: '1',
        type_data: 'Table',
        pro_fg: this.searchData.dataProdidentity.prod_order
      })
      .subscribe(
        (data: any) => {
          if (data.success) {
            console.log(data);
            this.listData = data.data;
            console.log(this.listData);
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            console.log(this.totalRecords);
            dataIpcQuality = data.data[0]
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
  fetchDataResultMicrobiology(data_item: any): void {
    this.listData = []
    this.dataSearch = []
    console.log(data_item);
    this.spinner.show();
    console.log("pro_fg : ", this.searchData.dataProdidentity.prod_order);

    this.service.post(`/data/resultmicrobiology/table`, {
      lotno: this.searchData.dataProdidentity.lotno,
      line: this.searchData.dataProdidentity.line,
      tag: data_item,
      ring: '1',
      type_data: 'Table',
    }).subscribe({
      next: (data: any) => {
        if (data.success) {
          console.log(data);
          this.listData = data.data;
          console.log(this.listData);
          this.dataSearch = data.data;
          this.totalRecords = this.listData.length;
          console.log(this.totalRecords);
          this.setPaginationData();
        }
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  fetchDataResultBottleDimension(data_item: any) {
    this.listData = [];
    this.dataSearch = [];
    this.tabDataBottle = [];
    
    console.log(data_item);
    this.spinner.show();
    this.fetchTabDataBottle();
    this.dynamicHeader = "Bottle Weight";
    this.dynamicField = "std_bw";
    this.dynamicFieldData = "bottle_weight";
    
    // Post request to fetch the main table data
    this.service
      .post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item, // Use the provided data_item here
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Full Response Data:', data); // Debugging the response structure
          
          // Process main data
          if (data && data.data) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            console.log(data.data[0]);
          } else {
            console.warn('Unexpected data structure:', data);
          }
          this.setPaginationData();
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  fetchDataResultCappingPerformance(data_item: any) {
    this.listData = [];
    this.dataSearch = [];
    this.tabDataCapping = [];
    
    console.log(data_item);
    this.spinner.show();
    this.fetchTabDataCapping();
    this.dynamicHeader = "Capping";
    this.dynamicField = "std_ca";
    this.dynamicFieldData = "ca";
    
    // Post request to fetch the main table data
    this.service
      .post(`/data/resultcappingperformance/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item, // Use the provided data_item here
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Full Response Data:', data); // Debugging the response structure
          
          // Process main data
          if (data && data.data) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            console.log(data.data[0]);
          } else {
            console.warn('Unexpected data structure:', data);
          }
          this.setPaginationData();
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }
  
  fetchDataResultPreformCheck(data_item: any) {
    this.listData = [];
    this.dataSearch = [];
    this.tabDataPreform = [];

    console.log(data_item);
    this.spinner.show();
    this.fetchTabDataPreform();
    this.dynamicHeader = "Weight";
    this.dynamicField = "pf_weight";
    this.dynamicFieldData = "weight";
    this.isDynamicFieldArray = false;  // Set flag to true if it's an array
  
    // Post request to fetch the main table data
    this.service
      .post(`/data/resultpreformcheck/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item, // Use the provided data_item here
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Full Response Data:', data); // Debugging the response structure
          
          // Process main data
          if (data && data.data) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            console.log(data.data[0]);
          } else {
            console.warn('Unexpected data structure:', data);
          }
          this.setPaginationData();
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
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

  dataAbnormaly: any;
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
          const alarmCodes = data.data.map((item: any) => item.alarm_code);
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
              categories: alarmCodes.map((code: string) => [code]),
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

  tabDataBottle:any
  tabDataPreform:any
  tabDataCapping:any
  fetchTabDataBottle() {
    this.service
      .post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_bottle_dimension_minmax', // Specific tag for minmax data
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Tab Data Response:', data); // Debugging the tab data response
          
          if (data && data.data) {
            this.tabDataBottle = data.data;
            console.log('tabDataBottle:', this.tabDataBottle);
          } else {
            console.warn('No tab data found for result_bottle_dimension_minmax');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchTabDataCapping() {
    this.service
      .post(`/data/resultcappingperformance/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_capping_performance_minmax', // Specific tag for minmax data
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Tab Data Response:', data); // Debugging the tab data response
          
          if (data && data.data) {
            this.tabDataCapping = data.data;
            console.log('tabDataCapping:', this.tabDataCapping);
          } else {
            console.warn('No tab data found for result_capping_performance_minmax');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchTabDataPreform() {
    this.service
      .post(`/data/resultpreformcheck/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_preform_check_minmax', // Specific tag for minmax data
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          console.log('Tab Data Response:', data); // Debugging the tab data response
          
          if (data && data.data) {
            this.tabDataPreform = data.data;
            console.log('tabPreformCheck:', this.tabDataPreform);
          } else {
            console.warn('No tab data found for result_preform_check_minmax');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  

  navigateToBack() {
    const searchData = this.searchData;
    this.router.navigate(['/protrace/general-information'], {
      state: { searchData },
    });
  }

  // onSearchTest(searchTerm: string, data: any[], searchableFields: string[], listToUpdate: string) {
  //   console.log('Current searchTerm:', searchTerm);

  //   if (!searchTerm) {
  //     this[listToUpdate] = data;
  //     console.log('a');
  //   } else {
  //     console.log('b');
  //     const searchTermLower = searchTerm.toLowerCase();
  //     this[listToUpdate] = data.filter((item: any) => {
  //       return searchableFields.some((field: string) => 
  //         item[field]?.toString().toLowerCase().includes(searchTermLower)
  //       );
  //     });
  //   }
  // }


  onSearch(searchTerm: string) {
    console.log('Current searchTerm:', searchTerm);
    if (!searchTerm) {
      this.listData = this.dataAbnormaly;
      console.log('a');
    } else {
      console.log('b');
      const searchTermLower = searchTerm.toLowerCase();
      this.listData = this.dataAbnormaly.filter((data: any) => {
        return (
          data.alarm_code.toString().toLowerCase().includes(searchTermLower) ||
          data.problem.toString().toLowerCase().includes(searchTermLower)
        );
      });
    }
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
          return data[key] && data[key].toString().toLowerCase().includes(searchTermLower);
        });
      });
    }
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

  onPageSizeChangeIpcQuality(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
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
      series: [19, 5, 5, 5, 5, 5, 40, 16, 10, 20, 11],
      labels: [
        'IPC Quality Result',
        'Microbiology Result',
        'Bottle Dimension Result',
        'Crapping Performance Result',
        'Preform check Result',
        'CCP Result',
        'Preparation syrup Result',
        'Abnormally Result',
        'Operator Manual Insp Result',
        'Bottle Pressure Result',
        'Packaging Material Result',
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

  checkPassDataIPC(min: number, max: number, result: number): string {
    if (result >= min && result <= max) {
      return 'PASS'
    }
    return 'NOT PASS';
  }

  checkPassDataMicrobiology(yeast: number, tab: number, staphy: number, pseudo: number, coliform: number): string {
    if (yeast == 0 && tab == 0 && staphy == 0 && pseudo == 0 && coliform == 0) {
      return 'PASS'
    }
    return 'NOT PASS';
  }

  checkPassDataMicrobiologyIfOK(dataMicrobiology: number): any {
    if (dataMicrobiology == 0) {
      return 'OK'
    }
    return dataMicrobiology;
  }


}


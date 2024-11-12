import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-detail-ring-two',
  templateUrl: './detail-ring-two.component.html',
  styleUrls: ['./detail-ring-two.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class DetailRingTwoComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  simpleDonutChart: any;
  chartRendered = false;
  dataStandard: any;
  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  listData = [];
  dataSearch: any;

  // Cleaning & Sanitation
  pageSizeCleaning: number = 5;
  pageCleaning: number = 1;
  searchTermCleaning: string = '';
  totalRecordsCleaning: any;
  totalPagesCleaning: any;
  startIndexCleaning: number = 1;
  endIndexCleaning: number = this.pageSizeCleaning;
  listDataCleaning = [];
  dataSearchCleaning: any;

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

  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  statusForm: any;
  dataMasterAuthorization = [];
  data = [];
  idEdit: any;
  typeaheadEmployee = new EventEmitter<string>();
  dataEmployee = [];
  showChart = true;
  productLotNo: any;
  dataProduct: any;
  dataSections: any = [];
  dataSectionCleaning: any[] = [];
  dataResultTable: any = [];
  dataMinMaxPreparationChiller: any = [];
  dataMinMaxPreparationAirCompressor8Bar: any = [];
  dataMinMaxPreparationListrik: any = [];
  dataMinMaxInjectionChiller: any = [];
  dataMinMaxInjectionAirCompressor8Bar: any = [];
  dataMinMaxInjectionListrik: any = [];
  dataMinMaxBlowChiller: any = [];
  dataMinMaxBlowAirCompressor40Bar: any = [];
  dataMinMaxBlowListrik: any = [];
  dataMinMaxFillerAirCompressor: any = [];
  dataMinMaxFillerListrik: any = [];
  dataMinMaxLN2AirCompressor8Bar: any = [];
  dataMinMaxLN2Listrik: any = [];
  dataMinMaxCaperAirCompressor8Bar: any = [];
  dataMinMaxCSCAirCompressor8Bar: any = [];
  dataMinMaxCaperListrik: any = [];
  dataMinMaxLabelAirCompressor8Bar: any = [];
  dataMinMaxLabelListrik: any = [];
  dataMinMaxCaserAirCompressor8Bar: any = [];
  dataMinMaxCaserListrik: any = [];
  dataMinMaxProductionPreparation: any = [];
  dataMinMaxProductionInjectionEjectorForward: any = [];
  dataMinMaxProductionInjectionEjectorBack: any = [];
  dataMinMaxProductionInjectionEjectorBooster: any = [];
  dataMinMaxProductionInjectionCooling: any = [];
  dataMinMaxProductionInjectionHold: any = [];
  dataMinMaxProductionInjectionFastFill: any = [];
  dataMinMaxProductionInjectionRobot: any = [];
  dataMinMaxProductionInjectionMoldPosition: any = [];
  dataMinMaxProductionInjectionOther: any = [];
  dataMinMaxProductionBlow: any = [];
  dataMinMaxProductionFiller: any = [];
  activeTitle: string = '';
  isActiveToggleClean: boolean = false;
  isActiveToggleCleanDetail: boolean = false;
  cleanType: any

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

  dataTabInspectionCamera: any

  utilityTrendChart: Highcharts.Options = {};
  // private chartData(colors: any) {
  //   this.utilityTrendChart = {
  //     series: [
  //       {
  //         name: 'Data',
  //         data: [],
  //       },
  //     ],
  //     chart: {
  //       height: 350,
  //       type: 'area',
  //       zoom: {
  //         enabled: true,
  //       },
  //       toolbar: {
  //         show: true,
  //       },
  //     },
  //     annotations: {
  //       yaxis: [
  //         {
  //           y: null,
  //           borderColor: '#FF4560',
  //           label: {
  //             borderColor: '#FF4560',
  //             style: {
  //               color: '#fff',
  //               background: '#FF4560',
  //             },
  //             text: 'Min',
  //           },
  //         },
  //         {
  //           y: null,
  //           borderColor: '#00E396',
  //           label: {
  //             borderColor: '#00E396',
  //             style: {
  //               color: '#fff',
  //               background: '#00E396',
  //             },
  //             text: 'Max',
  //           },
  //         },
  //       ],
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //       width: 3,
  //     },
  //     markers: {
  //       size: 0
  //     },
  //     colors: colors,
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         shadeIntensity: 1,
  //         inverseColors: false,
  //         opacityFrom: 0.5,
  //         opacityTo: 0,
  //         stops: [0, 90, 100],
  //       },
  //     },
  //     xaxis: {
  //       type: 'datetime',
  //       tooltip: {
  //         enabled: false,
  //       },
  //     },
  //   };
  // }
  constructor(
    public service: AppService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
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
          type: 'area', // Menambahkan tipe grafik
          data: [],
          lineWidth: 0.5,
          name: 'Data CCP Result',
        } as Highcharts.SeriesOptionsType,
      ], // Tambahkan casting
    };
  }

  // Build form group
  public formData = this.formBuilder.group({
    employee_code: [null, [Validators.required]],
    employee_name: [null, [Validators.required]],
    role: [null, [Validators.required]],
    site: [null],
  });

  // To make controlling the form easier
  get form() {
    return this.formData.controls;
  }

  searchData: any;
  linecode: any;
  @ViewChild('modalForm') modalForm: TemplateRef<any> | undefined;
  ngOnInit() {
    this._simpleDonutChart();
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

    // if (atob(this.currentUserLogin.role) == '1') {
    //   this.service.get('/master/authorization').subscribe((result) => {
    //     if (result.success) {
    //       console.log(result.data);
    //       this.dataMasterAuthorization = result.data;
    //       this.dataSearch = result.data;
    //       this.listData = this.dataMasterAuthorization;
    //       this.totalRecords = this.listData.length;
    //       this.setPaginationData();
    //     }
    //   });
    // } else {
    //   this.service
    //     .get('/master/authorization-by-site/' + this.currentUserLogin.site)
    //     .subscribe((result) => {
    //       if (result.success) {
    //         this.dataMasterAuthorization = result.data;
    //         this.dataSearch = result.data;
    //         this.listData = this.dataMasterAuthorization;
    //         this.totalRecords = this.listData.length;
    //         this.setPaginationData();
    //       }
    //     });
    // }

    this.onTabChange('', 'chiller_preparation');
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  // pdfSrc: any = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  pdfSrc: any = '';
  // pdfSrc: string | Uint8Array | undefined;
  // pdfUrl =
  //   'https://myapps.aio.co.id/jasperserver/rest_v2/reports/reports/OCI_3/Filling_1/96_pemeriksaan_proses_cop_.pdf?lotno=04.12.22%20S1';

  pdfUrl =
    'https://myapps.aio.co.id/jasperserver/rest_v2/reports/reports/OCI_3/Filling_1/96_pemeriksaan_proses_cop_.pdf?lotno=';

  username = 'jasperadmin';
  password = 'jasperadmin';

  getPdf(
    url: string,
    username: string,
    password: string,
    lotno: string
  ): Observable<Blob> {
    const proxyUrl = `${this.service.url()}/cleaning-sanitation/jasper-pdf?url=${encodeURIComponent(
      url
    )}${lotno}&username=${username}&password=${password}`;
    return this.http.get(proxyUrl, { responseType: 'blob' });
  }

  loadPdf(lotno: any, url: any) {
    this.getPdf(url, this.username, this.password, lotno).subscribe(
      (pdfBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = new Uint8Array(e.target.result);
        };
        reader.readAsArrayBuffer(pdfBlob);
      },
      (error) => {
        console.error('Error loading PDF:', error);
      }
    );
  }

  onError(error: any) {
    console.error('Error loading PDF:', error);
  }

  onLoadComplete(pdf: any) {

  }

  dataCleaning: any = [
    {
      id: 1,
      type: 'CIP OC3 Process',
      time: '2022-12-06T08:00:00',
      detail: 'As standard',
    },
    {
      id: 2,
      type: 'COP Process',
      time: '2022-12-06T19:00:00',
      detail: 'As standard',
    },
    {
      id: 3,
      type: 'SIP Process',
      time: '2022-12-06T09:55:00',
      detail: 'As standard',
    },
    {
      id: 4,
      type: 'SIOP Process',
      time: '2022-12-06T16:00:00',
      detail: 'As standard',
    },
    {
      id: 5,
      type: 'Before CSIOP Process',
      time: '2022-12-06T17:20:00',
      detail: 'As standard',
    },
  ];

  toggleView(data: any = {}) {
    if (Object.keys(data).length > 0) {
      this.loadPdf(this.productLotNo, data.url_pdf);
    }
    this.isActiveToggleClean = !this.isActiveToggleClean;
    this.isActiveToggleCleanDetail = false
  }

  toggleViewDetail(data: any = {}) {
    if(data){
      this.isActiveToggleCleanDetail = !this.isActiveToggleCleanDetail;
      this.isActiveToggleClean = false
      this.cleanType = data.type
      this.listDataCleaning = []
      this.dataSectionCleaning = [];
      if (this.cleanType == 'CIP OC3 Process'){
        this.dataSectionCleaning.push(
          {
            item: 'nozzle_cap_positioning',
            title: 'Nozzle Cap Positioning'
          },
          {
            item: 'remain_solution_drain',
            title: 'Remain Solution Drain'
          },
          {
            item: 'cip_hot_water',
            title: 'CIP Hot Water'
          },
          {
            item: 'cip_alkali_circulation',
            title: 'CIP Alkali Circulation'
          },
          {
            item: 'cip_alkali_rinsing',
            title: 'CIP Alkali Rinsing Water Rinse 2'
          },
        )
        this.onTabChangeCleaningSanitationDetail(this.dataSectionCleaning[0].item)
      } else if (this.cleanType == 'COP Process'){
        this.dataSectionCleaning.push(
          {
            item: 'cop_1st_hot_water_oc3',
            title: 'COP 1st Hot Water'
          },
          {
            item: 'cop_drain_oc3',
            title: 'Drain 1'
          },
          {
            item: 'cop_alkali_oc3',
            title: 'COP Alkali'
          },
          {
            item: 'cop_drain_alkali_oc3',
            title: 'Drain Alkali'
          },
          {
            item: 'cop_2nd_hot_water_oc3',
            title: 'COP 2nd Hot Water'
          },
          {
            item: 'cop_drain_2_oc3',
            title: 'Drain 2'
          },
        )
        this.onTabChangeCleaningSanitationDetail(this.dataSectionCleaning[0].item)
      } else if (this.cleanType == 'SIP Process'){
        this.dataSectionCleaning.push(
          {
            item: 'ln2_all_sip_oc3',
            title: 'LN2 All SIP'
          },
          {
            item: 'aseptic_air_sip_oc3',
            title: 'Aseptic Air'
          },
          {
            item: 'aseptic_water_sip_oc3',
            title: 'Aseptic Water'
          },
          {
            item: 'cap_sterilizarion_filter_sip_oc3',
            title: 'Cap Sterilization Filter SIP'
          }
        )
        this.onTabChangeCleaningSanitationDetail(this.dataSectionCleaning[0].item)
      } else if (this.cleanType == 'SIOP Process'){
        this.dataSectionCleaning.push(
          {
            item: 'sop_oxonia_oc3',
            title: 'SOP Oxonia'
          },
          {
            item: 'siop_drain_oc3',
            title: 'Drain'
          },
          {
            item: 'sop_oxonia_rinsing_oc3',
            title: 'SOP Oxonia Rinsing'
          },
          {
            item: 'siop_drain_alkali_oc3',
            title: 'Drain Alkali'
          },
          {
            item: 'sip_pure_steam_oc3',
            title: 'SIP Pure Steam'
          },
          {
            item: 'siop_air_cooling_oc3',
            title: 'Air Cooling'
          },
        )
        this.onTabChangeCleaningSanitationDetail(this.dataSectionCleaning[0].item)
      } else if (this.cleanType == 'Before CSIOP Process'){
        this.dataSectionCleaning.push(
          {
            item: 'before_csiop_process_oc3',
            title: 'Before CSIOP Process'
          },
          {
            item: 'hot_water_rinse_chamber_check',
            title: 'Hot Water Rinse Chamber Check (Before CSIOP Process)'
          },
        )
        this.onTabChangeCleaningSanitationDetail(this.dataSectionCleaning[0].item)
      }
    }
  }

  toggleViewStaticInspectionCamera(data: any){
    if(data != ''){
      this.getDataStatisticInspectionCamera(data)
    } 
    this.isActiveToggleStatisticInspectionCamera = !this.isActiveToggleStatisticInspectionCamera
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

  onPageSizeChange(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
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

  setPaginationDataCleaning() {
    this.totalPagesCleaning = Math.ceil(this.totalRecordsCleaning / this.pageSizeCleaning);
  }

  getShowingTextCleaning(): string {
    const startIndex = (this.pageCleaning - 1) * this.pageSizeCleaning + 1;
    const endIndex = Math.min(this.pageCleaning * this.pageSizeCleaning, this.totalRecordsCleaning);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  onPageSizeChangeCleaning(newPageSize: string) {
    this.pageSizeCleaning = parseInt(newPageSize, 10);
    this.startIndexCleaning = 1;
    this.endIndexCleaning = this.pageSizeCleaning;
    this.setPaginationData();
  }

  onSearchAllCleaning(searchTerm: string) {
    if (!searchTerm) {
      this.listDataCleaning = this.dataSearchCleaning;
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.listDataCleaning = this.dataSearchCleaning.filter((data: any) => {
        return Object.keys(data).some((key) => {
          return (
            data[key] &&
            data[key].toString().toLowerCase().includes(searchTermLower)
          );
        });
      });
    }
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
    this.setPaginationData();
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

  onPanelChange(event: any) {
    this.dataSections = [];
    if (event.panelId == 'utility-machine') {
      this.onTabChange('', 'chiller_preparation');
    } else if (event.panelId == 'production-machine') {
      this.onTabChangeProductionMachine('production_preparation');
    } else if (event.panelId == 'cleaning-sanitation') {
      this.onTabChangeCleaningSanitation('cleaning-sanitation');
    } else if (event.panelId == 'inspection-result-camera') {
      this.onChangePanelInspectionCamera();
    } else if (event.panelId == 'inspection-external-result') {
      this.onTabChangeInspectionExternalResult('production_preparation');
    } else if (event.panelId == 'water-performance-result') {
      this.onTabChangeWaterPerformanceResult('production_preparation');
    }
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
    } else if (section == 'chiller_injection') {
      this.dataSections.push({
        data: 'temperature',
        title: 'Temperature',
        maxKey: 'MaxValueTemperature',
        minKey: 'MinValueTemperature',
        avgKey: 'AvgValueTemperature',
        tagChart: 'chiller_injection_temperature',
        color: 'biru',
        colorCode: '#6bc4ff',
      });
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxInjectionChiller(section);
    } else if (section == 'air_compressor_8_bar_injection') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_injection_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_injection_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxInjectionAirCompressor8Bar(section);
    } else if (section == 'listrik_injection') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_injection_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_injection_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxInjectionListrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'chiller_blow') {
      this.dataSections.push(
        {
          data: 'temperature',
          title: 'Temperature',
          maxKey: 'MaxValueTemperature',
          minKey: 'MinValueTemperature',
          avgKey: 'AvgValueTemperature',
          tagChart: 'chiller_blow_temperature',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'pressure',
          title: 'Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'chiller_blow_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxBlowChiller(section);
    } else if (section == 'air_compressor_40_bar_blow') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 40 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_40_bar_blow_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 40 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_40_bar_blow_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxBlowAirCompressor40Bar(section);
    } else if (section == 'listrik_blow') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_blow_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_blow_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxBlowListrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_filler') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_filler_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_filler_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxFillerAirCompressor(section);
    } else if (section == 'listrik_filler') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_filler_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_filler_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxFillerListrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_8_bar_ln2') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_ln2_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_ln2_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxLN2AirCompressor8Bar(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'listrik_ln2') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_ln2_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_ln2_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxLN2Listrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_8_bar_caper') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_caper_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_caper_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxCaperAirCompressor8Bar(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'listrik_caper') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_caper_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_caper_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxCaperListrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_8_bar_csc') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_csc_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_csc_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxCSCAirCompressor8Bar(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_8_bar_label') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_label_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_label_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxLabelAirCompressor8Bar(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'listrik_label') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_label_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_label_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxLabelListrik(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'air_compressor_8_bar_caser') {
      this.dataSections.push(
        {
          data: 'pressure',
          title: 'Air Compressor 8 Bar - Pressure',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'air_compressor_8_bar_caser_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'flow',
          title: 'Air Compressor 8 Bar - Flow',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'air_compressor_8_bar_caser_flow',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxCaserAirCompressor8Bar(section);
      this.onChangeChart(this.dataSections[0]);
    } else if (section == 'listrik_caser') {
      this.dataSections.push(
        {
          data: 'voltase',
          title: 'Listrik - Voltase',
          maxKey: 'MaxValueVoltase',
          minKey: 'MinValueVoltase',
          avgKey: 'AvgValueVoltase',
          tagChart: 'listrik_caser_voltage',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'ampere',
          title: 'Listrik - Arus / Ampere',
          maxKey: 'MaxValueAmpere',
          minKey: 'MinValueAmpere',
          avgKey: 'AvgValueAmpere',
          tagChart: 'listrik_caser_ampere',
          color: 'hijau',
          colorCode: '#7cffa8',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxCaserListrik(section);
      this.onChangeChart(this.dataSections[0]);
    }
  }

  onTabChangeProductionMachine(section: any) {
    this.dataSections = [];
    if (section == 'production_preparation') {
      this.dataSections.push(
        // {
        //   data: 'brix',
        //   title: 'Brix Pocari solution (%)',
        //   maxKey: 'max_brix_RIA311',
        //   minKey: 'min_brix_RIA311',
        //   avgKey: 'avg_brix_RIA311',
        //   tagChart: 'preparation_brix_solution',
        //   color: 'biru',
        //   colorCode: '#6bc4ff',
        // },
        // {
        //   data: 'pressure_aseptic_tank',
        //   title: 'Pressure Aseptic Tank',
        //   maxKey: 'max_press_aseptic',
        //   minKey: 'min_press_aseptic',
        //   avgKey: 'avg_press_aseptic',
        //   tagChart: 'preparation_pressure_aseptic_tank',
        //   color: 'orange',
        //   colorCode: '#ffe66a',
        // },
        // {
        //   data: 'temperature_outlet_solution',
        //   title: 'Temperature Outlet Solution',
        //   maxKey: 'max_temp_outlet_sol',
        //   minKey: 'min_temp_outlet_sol',
        //   avgKey: 'avg_temp_outlet_sol',
        //   tagChart: 'preparation_temperature_outlet_solution',
        //   color: 'hijau',
        //   colorCode: '#7cffa8',
        // },
        // {
        //   data: 'bef_aft_fi213',
        //   title: 'Delta Press. Before After Fi213',
        //   maxKey: 'max_bef_aft_fi213',
        //   minKey: 'min_bef_aft_fi213',
        //   avgKey: 'avg_bef_aft_fi213',
        //   tagChart: 'preparation_bef_aft_fi213',
        //   color: 'purple',
        //   colorCode: '#b08fff',
        // }
        {
          data: 'brix',
          title: 'Brix Pocari solution (%)',
          maxKey: 'MaxValueBrix',
          minKey: 'MinValueBrix',
          avgKey: 'AvgValueBrix',
          tagChart: 'preparation_brix_solution',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'pressure_aseptic_tank',
          title: 'Pressure Aseptic Tank',
          maxKey: 'MaxValuePressure',
          minKey: 'MinValuePressure',
          avgKey: 'AvgValuePressure',
          tagChart: 'preparation_pressure_aseptic_tank',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'temperature_outlet_solution',
          title: 'Temperature Outlet Solution',
          maxKey: 'MaxValueTemperature',
          minKey: 'MinValueTemperature',
          avgKey: 'AvgValueTemperature',
          tagChart: 'preparation_temperature_outlet_solution',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'flow',
          title: 'Flow Solution CCP1',
          maxKey: 'MaxValueFlow',
          minKey: 'MinValueFlow',
          avgKey: 'AvgValueFlow',
          tagChart: 'preparation_flow_solution',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionPreparation(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_injection_ejector_forward') {
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
    } else if (section == 'production_blow') {
      this.dataSections.push(
        {
          data: 'flow_chiller_at_oven',
          title: 'Flow Chiller at Oven',
          maxKey: 'MaxValueFlowChiller',
          minKey: 'MinValueFlowChiller',
          avgKey: 'AvgValueFlowChiller',
          tagChart: 'production_blow_flow_ciller',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'temperature',
          title: 'Temperature',
          maxKey: 'MaxValueTemperature',
          minKey: 'MinValueTemperature',
          avgKey: 'AvgValueTemperature',
          tagChart: 'production_blow_temperature',
          color: 'purple',
          colorCode: '#b08fff',
        },
        {
          data: 'air_pressure',
          title: 'Incoming Air Pressure',
          maxKey: 'MaxValueAirPressure',
          minKey: 'MinValueAirPressure',
          avgKey: 'AvgValueAirPressure',
          tagChart: 'production_blow_air_pressure',
          color: 'hijau',
          colorCode: '#7cffa8',
        },
        {
          data: 'dust_removal_pressure',
          title: 'PF Dust Removal Pressure',
          maxKey: 'MaxValueDustRemovalPressure',
          minKey: 'MinValueDustRemovalPressure',
          avgKey: 'AvgValueDustRemovalPressure',
          tagChart: 'production_blow_dust_removal_pressure',
          color: 'orange',
          colorCode: '#ffe66a',
        },
        {
          data: 'stretching_pressure',
          title: 'Streching Pressure',
          maxKey: 'MaxValueStretchingPressure',
          minKey: 'MinValueStretchingPressure',
          avgKey: 'AvgValueStretchingPressure',
          tagChart: 'production_blow_stretching_pressure',
          color: 'biru',
          colorCode: '#6bc4ff',
        },
        {
          data: 'actuating_pressure',
          title: 'Actuating Pressure',
          maxKey: 'MaxValueActuatingPressure',
          minKey: 'MinValueActuatingPressure',
          avgKey: 'AvgValueActuatingPressure',
          tagChart: 'production_blow_actuating_pressure',
          color: 'purple',
          colorCode: '#b08fff',
        }
      );
      this.activeTitle = this.dataSections[0].title;
      this.fetchDataMinMaxProductionBlow(section);
      this.onChangeChartProductionMachineData(this.dataSections[0]);
    } else if (section == 'production_filler') {
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

  onChangePanelInspectionCamera() {
    this.dataTabInspectionCamera = []

    if(this.linecode == 'OC3'){
      this.dataTabInspectionCamera = [
        {
          title: "Label Area",
          data: "inspection_camera_oc3_label"
        },
        {
          title: "IJP Area",
          data: "inspection_camera_oc3_ijp"
        },
        {
          title: "CAP Area",
          data: "inspection_camera_oc3_cap"
        },
  
      ]
    }

    this.fetchDataInspectionCamera(this.dataTabInspectionCamera[0].data, this.dataTabInspectionCamera[0].title)
  }

  onTabChangeInspectionExternalResult(section: any) {
    console.log(section);
  }

  onTabChangeWaterPerformanceResult(section: any) {
    console.log(section);
  }

  dataCleaningSanitation: any;

  onTabChangeCleaningSanitation(section: any) {
    this.isActiveToggleClean = false;
    this.dataSections = [];
    this.dataCleaningSanitation = [];
    this.spinner.show();
    this.service
      .get(`/cleaning-sanitation/cleaning/${this.linecode}`)
      .subscribe(
        (result) => {
          if (result.success) {
            this.spinner.hide();
            this.dataCleaningSanitation = result.data;
            this.dataSearch = this.dataCleaningSanitation;
            this.listData = this.dataCleaningSanitation;
            this.totalRecords = this.listData.length;
            this.setPaginationData();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          console.error('Error fetching data:', error);
        }
      );
  }

  onTabChangeCleaningSanitationDetail(section: any){
    if (section == 'nozzle_cap_positioning') {
      this.activeTitle = 'Nozzle Cap Positioning'
    } else if (section == 'remain_solution_drain') {
      this.activeTitle = 'Remain Solution Drain'
    } else if (section == 'cip_hot_watet') {
      this.activeTitle = 'CIP Hot Water'
    } 
    this.onFetchDataTableCleaningSanitation(section)
  }
  transformData(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = new Date(item.tanggal + 'Z').getTime();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, Number(formattedData)];
      })
      .sort((a, b) => a[0] - b[0]);
  }

  transformDataProduction(data: any[]): any[] {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = this.formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
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
            const { minKey, maxKey, colorCode, title } = section;
            const minAsal = this.formatNumber(this.dataResultTable[minKey]);
            const maxAsal = this.formatNumber(this.dataResultTable[maxKey]);
            const { dataTrend, dataStandard } = result.data;
            const transformedData = this.transformData(dataTrend);
            this.dataStandard = dataStandard;
            const darkerGradientColor = this.lightenColor(colorCode, 0.3);            
            let { min: standardMin, max: standardMax } = dataStandard;
            standardMin = Math.min(minAsal, standardMin);
            standardMax = Math.max(maxAsal, standardMax);
            const bufferY = (standardMax - standardMin) * 0.1;
            const min = standardMin - bufferY;
            const max = standardMax + bufferY;
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

  onFetchDataTableCleaningSanitation(section: any) {
    this.activeTitle = section.title;
    this.spinner.show();
    const min = this.formatNumber(this.dataResultTable[section.minKey]);
    const max = this.formatNumber(this.dataResultTable[section.maxKey]);
    this.service
      .post(`/cleaning-sanitation/table-data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        ijp: this.searchData.ijp,
        pro_order: this.searchData.dataProdidentity.prod_order,
        line: this.searchData.dataProdidentity.line,
        tanggal: this.searchData.dataProdidentity.tgl,
        tag: section,
        ring: '2',
        type_data: 'Table',
        min: min,
        max: max,
        product_category: this.searchData.productCategory,
        prod_start: this.searchData.dataProdidentity.prod_start,
        prod_end: this.searchData.dataProdidentity.prod_end,
      })
      .subscribe(
        (result: any) => {
          console.log(result);
          
          if (result.success && result.status === 200) {
            this.listDataCleaning = result.data;
            this.dataSearchCleaning = result.data;
            this.totalRecordsCleaning = this.listDataCleaning.length;
            this.setPaginationData();
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
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

  fetchDataMinMaxInjectionChiller(data_item: any) {
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
            this.dataMinMaxInjectionChiller = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxInjectionChiller = [];
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

  fetchDataMinMaxInjectionAirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxInjectionAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxInjectionAirCompressor8Bar = [];
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

  fetchDataMinMaxInjectionListrik(data_item: any) {
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
            this.dataMinMaxInjectionListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxInjectionListrik = [];
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

  fetchDataMinMaxBlowChiller(data_item: any) {
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
            this.dataMinMaxBlowChiller = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxBlowChiller = [];
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

  fetchDataMinMaxBlowAirCompressor40Bar(data_item: any) {
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
            this.dataMinMaxBlowAirCompressor40Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxBlowAirCompressor40Bar = [];
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

  fetchDataMinMaxBlowListrik(data_item: any) {
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
            this.dataMinMaxBlowListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxBlowListrik = [];
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

  fetchDataMinMaxFillerAirCompressor(data_item: any) {
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
            this.dataMinMaxFillerAirCompressor = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxFillerAirCompressor = [];
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

  fetchDataMinMaxFillerListrik(data_item: any) {
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
            this.dataMinMaxFillerListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxFillerListrik = [];
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

  fetchDataMinMaxLN2AirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxLN2AirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxLN2AirCompressor8Bar = [];
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

  fetchDataMinMaxLN2Listrik(data_item: any) {
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
            this.dataMinMaxLN2Listrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxLN2Listrik = [];
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

  fetchDataMinMaxCaperAirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxCaperAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxCaperAirCompressor8Bar = [];
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

  fetchDataMinMaxCaperListrik(data_item: any) {
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
            this.dataMinMaxCaperListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxCaperListrik = [];
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

  fetchDataMinMaxCSCAirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxCSCAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxCSCAirCompressor8Bar = [];
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

  fetchDataMinMaxLabelAirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxLabelAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxLabelAirCompressor8Bar = [];
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

  fetchDataMinMaxLabelListrik(data_item: any) {
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
            this.dataMinMaxLabelListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxLabelListrik = [];
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

  fetchDataMinMaxCaserAirCompressor8Bar(data_item: any) {
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
            this.dataMinMaxCaserAirCompressor8Bar = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxCaserAirCompressor8Bar = [];
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

  fetchDataMinMaxCaserListrik(data_item: any) {
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
            this.dataMinMaxCaserListrik = result.data;
            this.dataResultTable = result.data;
            this.onChangeChart(this.dataSections[0]);
          } else {
            this.dataMinMaxCaserListrik = [];
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

  fetchDataMinMaxProductionPreparation(data_item: any) {
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
            this.dataMinMaxProductionPreparation = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
            // this.onChangeChart(this.dataSections[0])
          } else {
            this.dataMinMaxProductionPreparation = [];
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

  fetchDataMinMaxProductionBlow(data_item: any) {
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
            this.dataMinMaxProductionBlow = result.data;
            this.dataResultTable = result.data;
            this.onChangeChartProductionMachineData(this.dataSections[0]);
          } else {
            this.dataMinMaxProductionBlow = [];
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
    // this.spinner.show();
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
            const minAsal = 0;
            const maxAsal = 10;
            const dataStatistic = result.data;

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

  private _simpleDonutChart() {
    const series = [19, 5, 5, 5, 5, 5, 10, 10, 10, 10, 16];
    const startColor = '#132492';
    const endColor = '#687CFE';
    const colors = this.generateGradientColors(series, startColor, endColor);

    this.simpleDonutChart = {
      series: [19, 5, 5, 5, 5, 5, 40],
      labels: [
        'Machine Perfomance',
        'Report Inspection External',
        'Cleaning & Sanitation Result',
        'Inspection Result Camera',
        'Inspection External Result',
        'Water Performance Result',
        'Utility  Performance Result',
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

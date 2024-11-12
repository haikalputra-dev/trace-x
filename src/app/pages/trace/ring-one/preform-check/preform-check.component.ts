import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';


import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';

interface DataSection {
  title: string;
  data_item?: string;
  data_items?: string[];
  maxKey: string;
  minKey: string;
  avgKey: string;
  stdKey: string;
  color: string;
  colorCode: string;
  headers?: string[];
}

@Component({
  selector: 'app-preform-check',
  templateUrl: './preform-check.component.html',
  styleUrls: ['./preform-check.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class PreformCheckComponent {
  dataSectionsPreformCheck = [
    {
      title: 'Weight',
      data_item: 'weight',
      maxKey: 'result_max_weight',
      minKey: 'result_min_weight',
      avgKey: 'result_avg_weight',
      stdKey: 'std_weight',
      maxChart: 'max_weight',
      minChart: 'min_weight',
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
      maxChart: 'max_height',
      minChart: 'min_height',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Bead Height',
      data_item: 'bead_height',
      maxKey: 'result_max_bead_h',
      minKey: 'result_min_bead_h',
      avgKey: 'result_avg_bead_h',
      stdKey: 'std_bead_h',
      maxChart: 'max_bead_h',
      minChart: 'min_bead_h',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Inside Diameter',
      data_items: [
        'inside_diameter_1',
        'inside_diameter_2',
      ],
      headers: [
        'Inside Diameter 1mm',
        'Inside Diameter 25mm'
      ],
      maxKey: 'result_max_inside_diameter',
      minKey: 'result_min_inside_diameter',
      avgKey: 'result_avg_inside_diameter',
      stdKey: 'std_inside_diameter',
      maxChart: 'max_inside_diameter',
      minChart: 'min_inside_diameter',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Outside Diameter',
      data_item: 'outside_diameter',
      maxKey: 'result_max_outside_diameter',
      minKey: 'result_min_outside_diameter',
      avgKey: 'result_avg_outside_diameter',
      stdKey: 'outside_diameter',
      maxChart: 'max_outside_diameter',
      minChart: 'min_outside_diameter',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Screw Tread',
      data_item:'screw_thread_diameter',
      maxKey: 'result_max_screw_tread_d',
      minKey: 'result_min_screw_tread_d',
      avgKey: 'result_avg_screw_tread_d',
      stdKey: 'std_screw_tread_d',
      maxChart: 'max_screw_tread_d',
      minChart: 'min_screw_tread_d',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Bead Diameter',
      data_item: 'bead_diameter',
      maxKey: 'result_max_bead_d',
      minKey: 'result_min_bead_d',
      avgKey: 'result_avg_bead_d',
      stdKey: 'std_bead_d',
      maxChart: 'max_bead_d',
      minChart: 'min_bead_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Support Ring Height',
      data_item: 'support_ring_height',
      maxKey: 'result_max_support_ring_height_h',
      minKey: 'result_min_support_ring_height_h',
      avgKey: 'result_avg_support_ring_height_h',
      stdKey: 'std_support_ring_height_h',
      maxChart: 'max_support_ring_height_h',
      minChart: 'min_support_ring_height_h',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Support Ring Diameter',
      data_item: 'support_ring_height_d',
      maxKey: 'result_max_support_ring_height_d',
      minKey: 'result_min_support_ring_height_d',
      avgKey: 'result_avg_support_ring_height_d',
      stdKey: 'std_support_ring_height_d',
      maxChart: 'max_support_ring_height_d',
      minChart: 'min_support_ring_height_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Thickness',
      data_item: 'thickness',
      maxKey: 'result_max_thickness',
      minKey: 'result_min_thickness',
      avgKey: 'result_avg_thickness',
      stdKey: 'std_thickness',
      maxChart: 'max_thickness',
      minChart: 'min_thickness',
      color: 'purple',
      colorCode: '#b08fff',
    },
  ];

  lineChartConfig: any = {
    title: {
      text: [],
      align: 'left'
    },
    chart: {
      type: 'line',
      height: 350, // Ensure sufficient height
    },
    series: [
      {
        name: 'Hasil',
        data: [], // This will be updated dynamically
      },
    ],
    xaxis: {
      categories: [], // This will be updated dynamically
    },
    yaxis: {
      min: [], // This will be updated dynamically
      max: [], // This will be updated dynamically
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 4,
    },
    annotations: {
      yaxis: []
    }
  };

  constructor(public service: AppService, private spinner: NgxSpinnerService) { }

  listData: any;
  dataSearch: any;
  searchData: any;
  pageSize: number = 5;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  currentUserLogin: any;
  dataProduct: any;
  productLotNo: any;
  tabDataBottle: any;
  dynamicHeader: string = '';
  dynamicField: string = '';
  dynamicFieldData: any;
  isDynamicFieldArray: boolean = false;
  tabDataPreform: any;
  dynamicHeaders: string[] = [];

  ngOnInit() {
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }
    const storedDataProduct = localStorage.getItem('product');
    if (storedDataProduct) {
      this.dataProduct = JSON.parse(storedDataProduct);
      this.productLotNo = this.dataProduct.dataProdidentity.lotno;
    }
    this.searchData = history.state.data;
    this.fetchDataResultPreformCheck();
  }

  fetchDataResultPreformCheck(data_item: any = 'result_preform_check') {
    this.listData = [];
    this.dataSearch = [];
    this.tabDataPreform = [];
    this.spinner.show();
    this.fetchTabDataPreform();
    this.dynamicHeader = 'Weight';
    this.dynamicField = 'pf_weight';
    this.dynamicFieldData = 'weight';
    this.isDynamicFieldArray = false;
    this.service
      .post(`/data/resultpreformcheck/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item,
        ring: '1',
        type_data: 'Table',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            this.updateLineChart(this.listData, 'weight')
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
  fetchTabDataPreform() {
    this.service
      .post(`/data/resultpreformcheck/data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_preform_check_minmax',
        ring: '1',
        type_data: 'Data',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data) {
            this.tabDataPreform = data.data;
            console.log('tabPreformCheck:', this.tabDataPreform);
          } else {
            console.warn('No tab data found');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  toggleTabPreformCheck(section: any): void {
    let dataItems : any
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();
    this.setDynamicField(section);
    this.service
      .post(`/data/resultpreformcheck/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_preform_check',
        ring: '1',
        type_data: 'Table',
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.listData = response.data;
            this.dataSearch = response.data;
            this.totalRecords = this.listData.length;
            if (section.data_items) {
              dataItems = section.data_items;
            }else{
              dataItems = section.data_item;
            }
            this.updateLineChart(this.listData, dataItems);
            // this.updateLineChart(this.listData, section)
            this.setPaginationData();
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

  setDynamicField(section: any) {
    this.dynamicHeader = section.title;
    this.dynamicField = section.stdKey;

    if (section.data_items) {
      this.dynamicFieldData = section.data_items;
      this.isDynamicFieldArray = true;
      this.dynamicHeaders = section.headers || section.data_items;
    } else {
      this.dynamicFieldData = section.data_item;
      this.isDynamicFieldArray = false;
    }
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

  formatSymbol(symbol: any): string {
    if (!symbol) {
      return 'N/A';
    }
    if (symbol.includes('&lt;=')) {
      return symbol.replace('&lt;=', '≤');
    } else if (symbol.includes('&gt;=')) {
      return symbol.replace('&gt;=', '≥');
    } else if (symbol.includes('&lt;')) {
      return symbol.replace('&lt;', '<');
    } else if (symbol.includes('&gt;')) {
      return symbol.replace('&gt;', '>');
    }
    return symbol;
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

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
  }

  updateLineChart(data: any[], dataItem: string | string[]) {
    let chartTitle = '';
    let chartDataItems: string[] = [];

    const matchingSection = this.dataSectionsPreformCheck.find((section: DataSection) => {
      if (Array.isArray(dataItem)) {
        return section.data_items && dataItem.every(item => section.data_items!.includes(item));
      } else {
        return section.data_item === dataItem || (section.data_items && section.data_items.includes(dataItem));
      }
    });

    if (!matchingSection || !data.length) {
      console.error('No matching section found for data_item:', dataItem);
      return;
    }

    chartTitle = matchingSection.title;
    chartDataItems = matchingSection.data_items || [matchingSection.data_item!];

    // Create series data
    const chartData = chartDataItems.map(item => {
      const values = data.map(d => parseFloat(d[item]));
      return {
        name: item,
        data: values
      };
    });

    // Get max and min values from the specific fields
    let chartDataAnnotationsMax = 0;
    let chartDataAnnotationsMin = 0;

    try {
      if (data[0][matchingSection.maxChart] !== undefined && data[0][matchingSection.minChart] !== undefined) {
        chartDataAnnotationsMax = parseFloat(data[0][matchingSection.maxChart]);
        chartDataAnnotationsMin = parseFloat(data[0][matchingSection.minChart]);
      }

      // If we got NaN or the values weren't found, calculate from the data
      if (isNaN(chartDataAnnotationsMax) || isNaN(chartDataAnnotationsMin)) {
        console.warn('Using calculated min/max as fallback');
        const allValues = chartData.flatMap(series => series.data);
        chartDataAnnotationsMax = Math.max(...allValues);
        chartDataAnnotationsMin = Math.min(...allValues);
      }
    } catch (error) {
      console.error('Error processing min/max values:', error);
      // Fallback to calculated values
      const allValues = chartData.flatMap(series => series.data);
      chartDataAnnotationsMax = Math.max(...allValues);
      chartDataAnnotationsMin = Math.min(...allValues);
    }

    console.log('Max', chartDataAnnotationsMax);
    console.log('Min', chartDataAnnotationsMin);

    this.lineChartConfig = {
      ...this.lineChartConfig,
      title: { text: chartTitle },
      series: chartData,
      annotations: {
        yaxis: [
          chartDataAnnotationsMax !== 999 ? {
            y: chartDataAnnotationsMax,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: { color: '#fff', background: '#00E396' },
              text: 'MAX',
            }
          } : {},
          {
            y: chartDataAnnotationsMin,
            borderColor: '#0000FF',
            label: {
              borderColor: '#0000FF',
              style: { color: '#fff', background: '#0000FF' },
              text: 'MIN',
            }
          }
        ]
      },
      yaxis: {
        min: chartDataAnnotationsMin - 1,
        max: chartDataAnnotationsMax !== 999 ? chartDataAnnotationsMax + 2 : undefined,
      }
    };
  }  
  
}

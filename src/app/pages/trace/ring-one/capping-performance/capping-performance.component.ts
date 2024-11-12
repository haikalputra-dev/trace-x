import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-capping-performance',
  templateUrl: './capping-performance.component.html',
  styleUrls: ['./capping-performance.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class CappingPerformanceComponent {
  dataSectionsCappingPerformance = [
    {
      title: 'Capping Angle',
      data_item: 'ca',
      maxKey: 'result_max_ca',
      minKey: 'result_min_ca',
      avgKey: 'result_avg_ca',
      stdKey: 'std_ca',
      maxChart: 'max_ca',
      minChart: 'min_ca',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: '1st Open Torque',
      data_item: '1st',
      maxKey: 'result_max_1st',
      minKey: 'result_min_1st',
      avgKey: 'result_avg_1st',
      stdKey: 'std_1st',
      maxChart: 'max_1st',
      minChart: 'min_1st',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: '2nd Open Torque',
      data_item: '2nd',
      maxKey: 'result_max_2nd',
      minKey: 'result_min_2nd',
      avgKey: 'result_avg_2nd',
      stdKey: 'std_2nd',
      maxChart: 'max_2nd',
      minChart: 'min_2nd',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Bridge Break Angle',
      data_item: 'break',
      maxKey: 'result_max_break',
      minKey: 'result_min_break',
      avgKey: 'result_avg_break',
      stdKey: 'std_b',
      maxChart: 'max_b',
      minChart: 'min_b',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Leak Angle',
      data_item: 'leak',
      maxKey: 'result_max_leak',
      minKey: 'result_min_leak',
      avgKey: 'result_avg_leak',
      stdKey: 'std_l',
      maxChart: 'max_l',
      minChart: 'min_l',
      color: 'orange',
      colorCode: '#ffe66a',
    }
  ]

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

  constructor(public service: AppService, private spinner: NgxSpinnerService) {}
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
  tabDataCapping: any;
  dynamicHeader: string = '';
  dynamicField: string = '';
  dynamicFieldData: any;
  isDynamicFieldArray: boolean = false;

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
    this.fetchDataResultCappingPerformance('result_capping_performance');
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
      .post(`/data/cappingperformance/table`, {
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
            this.updateLineChart(data.data,'ca');
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

  toggleTabCappingPerformance(section: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    // Update the dynamic header
    this.setDynamicField(section)
    
    this.service
      .post(`/data/cappingperformance/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_capping_performance',
        ring: '1',
        type_data: 'Table'
      })
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            this.updateLineChart(data.data,section.data_item);
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

  fetchTabDataCapping() {
    this.service
      .post(`/data/cappingperformance/data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_capping_performance_minmax',
        ring: '1',
        type_data: 'Data'
      })
      .subscribe(
        (data: any) => {
          console.log('Tab Data Response:', data); // Debugging the tab data response
          
          if (data && data.data) {
            this.tabDataCapping = data.data;
            console.log('tabDataCapping:', this.tabDataCapping);
          } else {
            console.warn('No tab data found');
          }
        },
        (error) => {
          console.log(error);
        }
      );
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

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSize = parseInt(newPageSize, 10);
    this.startIndex = 1;
    this.endIndex = this.pageSize;
    this.setPaginationData();
  }

  setDynamicField(section: any) {
    this.dynamicHeader = section.title;
    this.dynamicField = section.stdKey;

    if (section.data_items) {
      this.dynamicFieldData = section.data_items;
      this.isDynamicFieldArray = true; 
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

  fetchData(data_item: string) {
    this.service
      .post(`/data/cappingperformance/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: data_item,
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
            console.warn('No tab data found');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateLineChart(data: any, data_item: any) {
    // Find the section where data_item matches the tag
    const matchingSection = this.dataSectionsCappingPerformance.find(
      (section) => section.data_item === data_item
    );

    if (!matchingSection || !data.length) {
      console.warn('No matching section or data found');
      return;
    }

    // Debug the data
    console.log('First data item:', data[0]);
    console.log('Looking for maxChart:', matchingSection.maxChart);
    console.log('Looking for minChart:', matchingSection.minChart);

    // Get chart data points
    const chartData = data.map((item: any) => parseFloat(item[data_item]));

    // Get max and min values with fallback
    let chartDataAnnotationsMax = 0;
    let chartDataAnnotationsMin = 0;

    try {
      // First try to get from the specific keys
      if (data[0][matchingSection.maxChart] !== undefined && data[0][matchingSection.minChart] !== undefined) {
        chartDataAnnotationsMax = parseFloat(data[0][matchingSection.maxChart]);
        chartDataAnnotationsMin = parseFloat(data[0][matchingSection.minChart]);
      }

      // If we got NaN or the values weren't found, calculate from the data
      if (isNaN(chartDataAnnotationsMax) || isNaN(chartDataAnnotationsMin)) {
        console.warn('Using calculated min/max as fallback');
        chartDataAnnotationsMax = Math.max(...chartData);
        chartDataAnnotationsMin = Math.min(...chartData);
      }
    } catch (error) {
      console.error('Error processing min/max values:', error);
      // Fallback to calculated values
      chartDataAnnotationsMax = Math.max(...chartData);
      chartDataAnnotationsMin = Math.min(...chartData);
    }

    console.log('Max', chartDataAnnotationsMax);
    console.log('Min', chartDataAnnotationsMin);
    
    // Update the chart config
    this.lineChartConfig = {
      ...this.lineChartConfig,
      title: {
        text: matchingSection.title
      },
      series: [{
        name: 'Hasil',
        data: chartData
      }],
      annotations: {
        yaxis: [
          {
            y: chartDataAnnotationsMax,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
              text: 'MAX',
            }
          },
          {
            y: chartDataAnnotationsMin,
            borderColor: '#0000FF',
            label: {
              borderColor: '#0000FF',
              style: {
                color: '#fff',
                background: '#0000FF',
              },
              text: 'MIN',
            }
          }
        ]
      },
      yaxis: {
        min: chartDataAnnotationsMin - 1,
        max: chartDataAnnotationsMax + 1,
      }
    };
  }


}

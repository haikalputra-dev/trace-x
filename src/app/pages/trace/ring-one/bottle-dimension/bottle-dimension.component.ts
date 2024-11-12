import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-bottle-dimension',
  templateUrl: './bottle-dimension.component.html',
  styleUrls: ['./bottle-dimension.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class BottleDimensionComponent {
  dataSectionsBottleDimension = [
    {
      title: 'Bottle Weight',
      data_item: 'bottle_weight',
      key: "bottleDim",
      maxKey: 'result_max_bw',
      minKey: 'result_min_bw',
      avgKey: 'result_avg_bw',
      stdKey: 'std_bw',
      maxChart: 'max_bw',
      minChart: 'min_bw',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Brimful Volume',
      data_item: 'brimful_vol',
      key: "bottleDim",
      maxKey: 'result_max_brimful',
      minKey: 'result_min_brimful',
      avgKey: 'result_avg_brimful',
      stdKey: 'std_brimful_vol',
      maxChart: 'max_brimful_vol',
      minChart: 'min_brimful_vol',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Section Weight (Top)',
      data_item: 'top_w',
      key: "bottleDim",
      maxKey: 'result_max_top_w',
      minKey: 'result_min_top_w',
      avgKey: 'result_avg_top_w',
      stdKey: 'std_top_w',
      maxChart: 'max_top_w',
      minChart: 'min_top_w',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Section Weight (Middle)',
      data_item: 'mid_w',
      key: "bottleDim",
      maxKey: 'result_max_mid_w',
      minKey: 'result_min_mid_w',
      avgKey: 'result_avg_mid_w',
      stdKey: 'std_mid_w',
      maxChart: 'max_mid_w',
      minChart: 'min_mid_w',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Section Weight (Bottom)',
      data_item: 'bot_w',
      key: "bottleDim",
      maxKey: 'result_max_bot_w',
      minKey: 'result_min_bot_w',
      avgKey: 'result_avg_bot_w',
      stdKey: 'std_bot_w',
      maxChart: 'max_bot_w',
      minChart: 'min_bot_w',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Bottle Height',
      data_item: 'bottle_height',
      key: "bottleDim",
      maxKey: 'result_max_height',
      minKey: 'result_min_height',
      avgKey: 'result_avg_height',
      stdKey: 'std_btl_height',
      maxChart: 'max_height',
      minChart: 'min_height',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Diameter (Top)',
      data_item: 'top_d',
      key: "bottleDim",
      maxKey: 'result_max_top_d',
      minKey: 'result_min_top_d',
      avgKey: 'result_avg_top_d',
      stdKey: 'std_top_d',
      maxChart: 'max_top_d',
      minChart: 'min_top_d',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Diameter (Middle)',
      data_item: 'mid_d',
      key: "bottleDim",
      maxKey: 'result_max_mid_d',
      minKey: 'result_min_mid_d',
      avgKey: 'result_avg_mid_d',
      stdKey: 'std_mid_d',
      maxChart: 'max_mid_d',
      minChart: 'min_mid_d',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Diameter (Bottom)',
      data_item: 'bot_d',
      key: "bottleDim",
      maxKey: 'result_max_bot_d',
      minKey: 'result_min_bot_d',
      avgKey: 'result_avg_bot_d',
      stdKey: 'std_bot_d',
      maxChart: 'max_bot_d',
      minChart: 'min_bot_d',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Gate Height',
      data_item: 'gate_height',
      key: "bottleDim",
      maxKey: 'result_max_gh',
      minKey: 'result_min_gh',
      avgKey: 'result_avg_gh',
      stdKey: 'std_gh',
      maxChart: 'max_gh',
      minChart: 'min_gh',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Residual H2o2',
      data_item: 'residual_h2o2',
      key: "residual",
      maxKey: 'result_max_residual',
      minKey: 'result_min_residual',
      avgKey: 'result_avg_residual',
      stdKey: 'standar_residual',
      maxChart: 'max_residual',
      minChart: 'min_residual',
      color: 'purple',
      colorCode: '#b08fff',
    }
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
    this.fetchDataResultBottleDimension('result_bottle_dimension');
  }

  fetchDataResultBottleDimension(data_item: any) {
    this.resetTable();
    console.log(data_item);
    this.spinner.show(); // Show spinner before making requests
  
    // Initialize dynamic values
    this.dynamicHeader = 'Bottle Weight';
    this.dynamicField = 'std_bw';
    this.dynamicFieldData = 'bottle_weight';
  
    // Execute both fetches in parallel using forkJoin
    forkJoin({
      bottleData: this.fetchBottleData(data_item),
      tabDataBottle: this.fetchTabDataBottle()
    }).subscribe({
      next: (results) => {
        // Handle responses from both requests
        console.log('Bottle Data:', results.bottleData);
        console.log('Tab Data Bottle:', results.tabDataBottle);
  
        if (results.bottleData?.data) {
          this.listData = results.bottleData.data;
          this.dataSearch = results.bottleData.data;
          this.totalRecords = this.listData.length;
  
          // Call updateLineChart with the fetched bottle data
          this.updateLineChart(results.bottleData.data, this.dynamicFieldData);
        } else {
          console.warn('No bottle data found.');
        }
  
        if (results.tabDataBottle) {
          this.tabDataBottle = results.tabDataBottle;
        }
  
        this.setPaginationData(); // Set pagination after data fetch
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
      complete: () => {
        this.spinner.hide(); // Hide the spinner after all requests complete
      }
    });
  }
  
  // Helper method to fetch bottle data (returns an Observable)
  fetchBottleData(data_item: any) {
    return this.service.post(`/data/resultbottledimension/table`, {
      lotno: this.searchData.dataProdidentity.lotno,
      line: this.searchData.dataProdidentity.line,
      tag: data_item,
      ring: '1',
      type_data: 'Table',
    });
  }
  
  // Helper method to fetch tab data bottle (returns an Observable)
  fetchTabDataBottle() {
    return forkJoin({
      minMax: this.service.post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_bottle_dimension_minmax',
        ring: '1',
        type_data: 'Data',
      }),
      residual: this.service.post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_bottle_dimension_residual_h2o2_minmax',
        ring: '1',
        type_data: 'Data',
      })
    }).pipe(
      map(({ minMax, residual }) => ({
        bottleDim: minMax?.data || [],
        residual: residual?.data || [],
      }))
    );
  }
  
  updateLineChart(data: any, data_item: string) {
    // Find the section where data_item matches the tag
    const matchingSection = this.dataSectionsBottleDimension.find(
      (section) => section.data_item === data_item
    );

    if (matchingSection && data && data.length > 0) {
      const chartTitle = matchingSection.title;
      const chartDataItem = matchingSection.data_item;
      const chartMax = matchingSection.maxChart;
      const chartMin = matchingSection.minChart;

      // Get max and min values from the first data entry
      const chartDataAnnotationsMax = data[0][chartMax];
      const chartDataAnnotationsMin = data[0][chartMin];

      // Map the chart data
      const chartData = data.map((item: any) => parseFloat(item[chartDataItem]));
      console.log('Parsed Chart Data:', chartData);

      // Update the chart configuration
      this.lineChartConfig = {
        ...this.lineChartConfig,
        title: { text: chartTitle },
        series: [{ name: 'Hasil', data: chartData }],
        annotations: {
          yaxis: [
            {
              y: chartDataAnnotationsMax,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: { color: '#fff', background: '#00E396' },
                text: 'MAX',
              },
            },
            {
              y: chartDataAnnotationsMin,
              borderColor: '#0000FF',
              label: {
                borderColor: '#0000FF',
                style: { color: '#fff', background: '#0000FF' },
                text: 'MIN',
              },
            },
          ],
        },
        yaxis: {
          min: chartDataAnnotationsMin - 1,
          max: chartDataAnnotationsMax + 1,
        },
      };
    } else {
      console.warn('No chart data found or invalid section.');
    }
  }
  

  toggleTabBottleDimension(section: any): void {
    this.resetTable()
    this.spinner.show();

    // Update the dynamic header
    this.setDynamicField(section);

    // Determine the tag based on the section data_item
    const tag = section.data_item === 'residual_h2o2'
      ? 'result_bottle_dimension_residual_h2o2'
      : 'result_bottle_dimension'; // Default tag

    this.service
      .post(`/data/resultbottledimension/table`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: tag,
        ring: '1',
        type_data: 'Table',
      })
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.listData = data.data;
            this.dataSearch = data.data;
            this.totalRecords = this.listData.length;
            this.updateLineChart(data.data, section.data_item);
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

  resetTable() {
    this.listData = [];
    this.dataSearch = [];
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




}

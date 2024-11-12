import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ipcquality-result',
  templateUrl: './ipcquality-result.component.html',
  styleUrls: ['./ipcquality-result.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class IPCQualityResultComponent {

  dataSectionsIpcQuality = [
    {
      title: 'Filling Volume',
      tag: 'result_ipcquality_fillingVolume',
      maxKey: 'max_filling_volume',
      minKey: 'min_filling_volume',
      avgKey: 'avg_filling_volume',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Brix',
      tag: 'result_ipcquality_brix',
      maxKey: 'max_brix',
      minKey: 'min_brix',
      avgKey: 'avg_brix',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'pH',
      tag: 'result_ipcquality_ph',
      maxKey: 'max_ph',
      minKey: 'min_ph',
      avgKey: 'avg_ph',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Sodium Content',
      tag: 'result_ipcquality_sodiumContent',
      maxKey: 'max_sodium_content',
      minKey: 'min_sodium_content',
      avgKey: 'avg_sodium_content',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Acidity',
      tag: 'result_ipcquality_acidity',
      maxKey: 'max_acidity',
      minKey: 'min_acidity',
      avgKey: 'avg_acidity',
      color: 'biru',
      colorCode: '#6bc4ff',
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
  tabDataIpc: any;
  dataResultIpcChart: any;

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

    // inisiasi awal saat di buka pertama kali
    this.toggleTabIpc('result_ipcquality_fillingVolume');
    this.fetchTabDataIpc();
  }

  toggleTabIpc(tags: any): void {
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();

    this.service.post(`/data/resultipcquality/table`, {
      lotno: this.searchData.dataProdidentity.lotno,
      line: this.searchData.dataProdidentity.line,
      tag: tags,
      ring: '1',
      type_data: 'Table',
    }).subscribe(
      (data: any) => {
        if (data.success) {
          this.listData = data.data;
          this.dataSearch = data.data;
          this.totalRecords = this.listData.length;
          this.setPaginationData();

          // Pass fetched data to the line chart
          this.updateLineChart(data.data,tags);

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


  fetchTabDataIpc() {
    this.service
      .post(`/data/resultipcquality/data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_ipcquality_minmax',
        ring: '1',
        type_data: 'Data',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data) {
            this.tabDataIpc = data.data;

          } else {
            console.warn(
              'No tab data found'
            );
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

  checkPassDataIPC(min: number, max: number, result: number): string {
    if (result >= min && result <= max) {
      return 'PASS';
    }
    return 'NOT PASS';
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



  updateLineChart(data: any, data_item: any) {
    if (!data || !data_item) {
      console.error('Invalid data or data_item');
      return;
    }

    // Find matching section for the title
    const matchingSection = this.dataSectionsIpcQuality.find(
      (section) => section.tag === data_item
    );
    const chartTitle = matchingSection?.title || '';

    // Format numbers to 2 decimal places and handle time format
    const formatNumber = (num: number) => Number(num.toFixed(2));
    const formatTime = (time: string) => {
      if (!time) return 'Unknown';
      // Handle HH:mm:ss format
      return time.substring(0, 5); // Take only the first 5 characters (HH:mm)
    };

    // Get min and max values from the data
    const chartDataAnnotationsMin = formatNumber(Math.min(...data.map((item: any) => parseFloat(item.min) || 0)));
    const chartDataAnnotationsMax = formatNumber(Math.max(...data.map((item: any) => parseFloat(item.max) || 0)));

    // Prepare chart data with formatted time
    const chartCategories = data.map((item: any) => 
      item.time ? formatTime(item.time) : 'Unknown'
    );
    const chartData = data.map((item: any) => formatNumber(parseFloat(item.hasil2) || 0));

    // Create annotations array
    let yaxisAnnotations: any[] = [
      {
        y: chartDataAnnotationsMin,
        borderColor: '#0000FF',
        label: {
          borderColor: '#0000FF',
          style: { color: '#fff', background: '#0000FF' },
          text: 'MIN',
        },
      },
    ];

    if (chartDataAnnotationsMax !== 999) {
      yaxisAnnotations.push({
        y: chartDataAnnotationsMax,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: { color: '#fff', background: '#00E396' },
          text: 'MAX',
        },
      });
    }

    // Update chart configuration
    this.lineChartConfig = {
      ...this.lineChartConfig,
      title: { text: chartTitle },
      series: [{ name: 'Hasil', data: chartData }],
      xaxis: { 
        categories: chartCategories,
        labels: {
          rotate: -45,  // Rotate labels 45 degrees
          rotateAlways: true,  // Always rotate the labels
          hideOverlappingLabels: false,  // Show all labels
          trim: false,  // Don't trim the labels
          style: {
            fontSize: '12px',  // Optional: adjust font size if needed
          }
        },
        tickPlacement: 'on'  // Ensure ticks align with labels
      },
      annotations: { yaxis: yaxisAnnotations },
      yaxis: {
        min: chartDataAnnotationsMin - 1,
        max: chartDataAnnotationsMax === 999 ? undefined : chartDataAnnotationsMax + 1,
        decimalsInFloat: 2, // Limit decimals in y-axis
      },
    };

    console.log('Time value:', data[0]?.time); // Log the first item's time value
  }




}

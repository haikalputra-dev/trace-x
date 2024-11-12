import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preparation-syrup',
  templateUrl: './preparation-syrup.component.html',
  styleUrls: ['./preparation-syrup.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class PreparationSyrupComponent {

  dataSectionsPreparationSyrup = [
    {
      title: 'Brix Sugar',
      tag: 'result_preparation_syrup_brixsugar',
      maxKey: 'max_brix_sugar',
      minKey: 'min_brix_sugar',
      avgKey: 'avg_brix_sugar',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Brix Syrup',
      tag: 'result_preparation_syrup_brixsyrup',
      maxKey: 'max_brix_syrup',
      minKey: 'min_brix_syrup',
      avgKey: 'avg_brix_syrup',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Acidity Syrup',
      tag: 'result_preparation_syrup_aciditysyrup',
      maxKey: 'max_acidity_syrup',
      minKey: 'min_acidity_syrup',
      avgKey: 'avg_acidity_syrup',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Dissolved Oxygen',
      tag: 'result_preparation_syrup_dissolved',
      maxKey: 'max_dissolved_oxygen',
      minKey: 'min_dissolved_oxygen',
      avgKey: 'avg_dissolved_oxygen',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Brix ILB',
      tag: 'result_preparation_syrup_brixilb',
      maxKey: 'max_brix_ilb',
      minKey: 'min_brix_ilb',
      avgKey: 'avg_brix_ilb',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Brix T41',
      tag: 'result_preparation_syrup_brixt41',
      maxKey: 'max_brix_t41',
      minKey: 'min_brix_t41',
      avgKey: 'avg_brix_t41',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Acidity T41',
      tag: 'result_preparation_syrup_acidityt41',
      maxKey: 'max_acidity_t41',
      minKey: 'min_acidity_t41',
      avgKey: 'avg_acidity_t41',
      color: 'orange',
      colorCode: '#ffe66a',
    },
  ]

  lineChartConfig: any = {
    title: {
      text: '',
      align: 'left',
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
      min: undefined, // Start with undefined or a number
      max: undefined, // Start with undefined or a number
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 4,
    },
    annotations: {
      yaxis: [],
    },
    noData: {
      text: "Loading...", // Default loading message
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#000000',
        fontSize: '14px',
        fontFamily: 'Helvetica',
      },
    },
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
  tabData: any;
  dataResultChart: any;
  productTab: any;
  tabActive: number = 0;  // Initialize to make the first tab active
  filteredListData: any;
  activeTag: string = ""


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
    this.toggleTabPreparationSyrup('result_preparation_syrup_brixsugar');
    this.fetchTabDataPreparationSyrup();
  }

  toggleTabPreparationSyrup(tags: any): void {
    this.resetChart()
    this.listData = [];
    this.dataSearch = [];
    this.spinner.show();
    this.activeTag = tags;

    this.service.post(`/data/resultpreparationsyrup/table`, {
      lotno: this.searchData.dataProdidentity.lotno,
      line: this.searchData.dataProdidentity.line,
      tag: this.activeTag,
      ring: '1',
      type_data: 'Table',
    }).subscribe(
      (data: any) => {
        if (data.success) {
          this.listData = data.data;
          this.dataSearch = data.data;
          this.totalRecords = this.listData.length;
          this.setPaginationData();
          // Extract distinct product values from data.data
          this.productTab = [...new Set(data.data.map((item: any) => item.product))];

          console.log("distinct tipe produk", this.productTab);
          this.setActiveTab(0);


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

  fetchTabDataPreparationSyrup() {
    this.service
      .post(`/data/resultpreparationsyrup/data`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_preparation_syrup_minmax',
        ring: '1',
        type_data: 'Data',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data) {
            this.tabData = data.data;

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

  setActiveTab(index: number): void {
    this.tabActive = index; // Set the active tab to the clicked tab index
    const selectedProduct = this.productTab[index]; // Get the selected product from productTab

    // Filter the listData and dataSearch based on the selected product
    this.filteredListData = this.dataSearch.filter((item: any) => item.product === selectedProduct);

    // Update totalRecords to reflect the count of filtered results
    this.totalRecords = this.filteredListData.length;

    // Reset the listData to the filtered results
    this.listData = [...this.filteredListData];
    console.log(this.filteredListData);
    this.updateLineChart(this.filteredListData, this.activeTag);
  }

  resetChart() {
    this.lineChartConfig = {
      title: {
        text: '', // Reset title
        align: 'left',
      },
      chart: {
        type: 'line',
        height: 350, // Maintain chart height
      },
      series: [
        {
          name: 'Hasil',
          data: [], // Reset data
        },
      ],
      xaxis: {
        categories: [], // Reset categories
      },
      yaxis: {
        min: undefined, // Reset min
        max: undefined, // Reset max
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 4,
      },
      annotations: {
        yaxis: [], // Reset annotations
      },
      noData: {
        text: "Loading...", // Default loading message
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Helvetica',
        },
      },
    };
  }
  
  onSearchAll(searchTerm: string): void {
    if (!searchTerm) {
      // If no search term is provided, revert back to the filteredListData
      this.listData = [...this.filteredListData];
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.listData = this.filteredListData.filter((data: any) => {
        return Object.keys(data).some((key) => {
          return (
            data[key] &&
            data[key].toString().toLowerCase().includes(searchTermLower)
          );
        });
      });
    }

    // Update the total records count based on search results
    this.totalRecords = this.listData.length;
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
    if (!data || !data_item || !this.filteredListData?.length) {
      console.error('Invalid data, data_item, or filteredListData');
      return;
    }

    const matchingSection = this.dataSectionsPreparationSyrup.find(
      (section) => section.tag === data_item
    );

    if (!matchingSection) {
      console.error('No matching section found for data_item:', data_item);
      return;
    }

    // Get min and max values from filteredListData
    const distinctMinValues = [...new Set(this.filteredListData.map((item: any) => item.min))];
    const distinctMaxValues = [...new Set(this.filteredListData.map((item: any) => item.max))];

    console.log('Distinct Min:', distinctMinValues);
    console.log('Distinct Max:', distinctMaxValues);

    const chartDataAnnotationsMin = Number(distinctMinValues[0]) || 0;
    const chartDataAnnotationsMax = Number(distinctMaxValues[0]) || 999;

    // Prepare chart data
    const chartCategories = this.filteredListData.map((item: any) =>
      item.time ? item.time.toString() : 'Unknown'
    );
    const chartData = this.filteredListData.map((item: any) =>
      parseFloat(item.hasil2) || 0
    );

    // Prepare annotations
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

    // Update the chart configuration
    this.lineChartConfig = {
      ...this.lineChartConfig,
      title: { text: matchingSection.title },
      series: [{ name: 'Hasil', data: chartData }],
      xaxis: { categories: chartCategories },
      annotations: { yaxis: yaxisAnnotations },
      yaxis: {
        min: chartDataAnnotationsMin - 1,
        max: chartDataAnnotationsMax === 999 ? undefined : chartDataAnnotationsMax + 1,
      }
    };
  }  

}

import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { slideInLeftDetail, slideInRightDetail } from 'src/app/utils/animation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-packaging-material',
  templateUrl: './packaging-material.component.html',
  styleUrls: ['./packaging-material.component.scss'],
  animations: [slideInLeftDetail, slideInRightDetail],
})
export class PackagingMaterialComponent {
  dataSectionsPackagingMaterial =[
    {
      title: 'Cap Inseal',
      tag : 'result_packaging_material_cap_inseal',
      key : 'cap_inseal',
      maxKey: 'result_min_cap_inseal',
      minKey: 'result_max_cap_inseal',
      avgKey: 'result_avg_cap_inseal',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Cap Height',
      tag : 'result_packaging_material_cap_height',
      key : 'cap_height',
      maxKey: 'result_min_cap_height',
      minKey: 'result_max_cap_height',
      avgKey: 'result_avg_cap_height',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Label Width',
      tag : 'result_packaging_material_label_width',
      key : 'label_width',
      maxKey: 'result_min_label_width',
      minKey: 'result_max_label_width',
      avgKey: 'result_avg_label_width',
      color: 'orange',
      colorCode: '#ffe66a',
    },
    {
      title: 'Label Length',
      tag : 'result_packaging_material_label_length',
      key : 'label_length',
      maxKey: 'result_min_label_length',
      minKey: 'result_max_label_length',
      avgKey: 'result_avg_label_length',
      color: 'hijau',
      colorCode: '#7cffa8',
    },
    {
      title: 'Box Total Length',
      tag : 'result_packaging_material_box_totallength',
      key : 'box_length',
      maxKey: 'result_min_box_total_length',
      minKey: 'result_max_box_total_length',
      avgKey: 'result_avg_box_total_length',
      color: 'biru',
      colorCode: '#6bc4ff',
    },
    {
      title: 'Box Total Width',
      tag : 'result_packaging_material_box_totalwidth',
      key : 'box_width',
      maxKey: 'result_min_box_total_width',
      minKey: 'result_max_box_total_width',
      avgKey: 'result_avg_box_total_width',
      color: 'purple',
      colorCode: '#b08fff',
    },
    {
      title: 'Box Creasing',
      tag : 'result_packaging_material_box_creasing',
      key : 'box_creasing',
      maxKey: 'result_min_box_creasing',
      minKey: 'result_max_box_creasing',
      avgKey: 'result_avg_box_creasing',
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

  constructor(public service: AppService, private spinner: NgxSpinnerService){}

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
  tabDataPackaging: any;
  dynamicHeader: string = '';
  dynamicField: string = '';
  dynamicFieldData: any;
  isDynamicFieldArray: boolean = false;
  lotnoCap:string = ''
  lotnoLabel:string = ''
  lotnoBox:string = ''
  lotnoMaterial:string =''
  isLotnoMaterialFetched = false;
  isPackagingMaterialFetched = false;
  isTabDataPackagingFetched = false;

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
  
    this.getLotnoMaterial();

    // Add timeout to hide spinner after 10 seconds
    setTimeout(() => {
      if (this.spinner) {
        this.spinner.hide();
        console.warn('Spinner hidden due to timeout - data fetch took too long');
      }
    }, 10000);
  }
  
  getLotnoMaterial() {
    this.spinner.show();
  
    this.service
      .post(`/data/resultpackagingmaterial/lotmaterial`, {
        lotno: this.searchData.dataProdidentity.lotno,
        line: this.searchData.dataProdidentity.line,
        tag: "result_packaging_material_getlotnomaterial",
        ring: '1',
        type_data: 'Table',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const lotnoData = data.data[0];
            this.lotnoCap = lotnoData.lotno_cap;
            this.lotnoLabel = lotnoData.lotno_label;
            this.lotnoBox = lotnoData.lotno_box;
  
            console.log('lotnocap:', this.lotnoCap);
            console.log('lotnolabel:', this.lotnoLabel);
            console.log('lotnobox:', this.lotnoBox);
  
            // Initialize with cap_inseal data
            const initialSection = this.dataSectionsPackagingMaterial[0];
            this.fetchPackagingData(initialSection);
            this.fetchTabDataPackaging();
            
            this.isLotnoMaterialFetched = true;
            this.hideSpinnerIfAllFetched();
          } else {
            console.warn('No data found', data);
            this.isLotnoMaterialFetched = true;
            this.hideSpinnerIfAllFetched();
          }
          this.setPaginationData();
        },
        (error) => {
          console.log(error);
          this.isLotnoMaterialFetched = true;
          this.hideSpinnerIfAllFetched();
        }
      );
  }
  
  fetchPackagingData(section: any) {
    this.assignLotnoByType(section);
    this.resetTable();
    this.spinner.show();

    this.service.post(`/data/resultpackagingmaterial/table`, {
      lotno: this.lotnoMaterial,
      line: this.searchData.dataProdidentity.line,
      tag: section.tag,
      ring: '1',
      type_data: 'Table',
    }).subscribe(
      (data: any) => {
        if (data.success) {
          this.listData = data.data;
          this.dataSearch = data.data;
          this.totalRecords = this.listData.length;
          this.setPaginationData();
          this.updateLineChart(data.data, section.tag);
        }
        this.isPackagingMaterialFetched = true;
        this.hideSpinnerIfAllFetched();
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.isPackagingMaterialFetched = true;
        this.hideSpinnerIfAllFetched();
        this.spinner.hide();
      }
    );
  }
  
  fetchTabDataPackaging() {
    this.spinner.show();
  
    this.service
      .post(`/data/resultpackagingmaterial/data`, {
        lotno_cap: this.lotnoCap,
        lotno_label: this.lotnoLabel,
        lotno_box: this.lotnoBox,
        line: this.searchData.dataProdidentity.line,
        tag: 'result_packaging_material_minmax',
        ring: '1',
        type_data: 'Data',
      })
      .subscribe(
        (data: any) => {
          if (data && data.data) {
            console.log(data.data);
            this.tabDataPackaging = data.data;
          }
          this.isTabDataPackagingFetched = true;
          this.hideSpinnerIfAllFetched();
        },
        (error) => {
          console.log(error);
          this.isTabDataPackagingFetched = true;
          this.hideSpinnerIfAllFetched();
        }
      );
  }
  
  hideSpinnerIfAllFetched() {
    if (
      this.isLotnoMaterialFetched &&
      this.isPackagingMaterialFetched &&
      this.isTabDataPackagingFetched
    ) {
      this.spinner.hide();
    }
  }
  

  toggleTabPackaging(section: any) {
    this.fetchPackagingData(section);
  }

  assignLotnoByType(section:any){
    if (section.key === "cap_inseal" || section.key === "cap_height") {
      this.lotnoMaterial = this.lotnoCap
    }else if (section.key === "label_width" || section.key === "label_length") {
      this.lotnoMaterial = this.lotnoLabel
    }else if (section.key === "box_length" || section.key === "box_width" || section.key === "box_creasing") {
      this.lotnoMaterial = this.lotnoBox
    }
  }

  resetTable(){
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

  updateLineChart(data: any, data_item: any) {
    if (!data || !data_item) {
      console.error('Invalid data or data_item');
      return;
    }
  
    const matchingSection = this.dataSectionsPackagingMaterial.find(
      (section) => section.tag === data_item
    );
  
    const chartTitle = matchingSection ? matchingSection.title : '';
    
    const chartCategories = data.map((item: any) =>
      item.waktu ? item.waktu.toString() : 'Unknown'
    );
    const chartData = data.map((item: any) =>
      parseFloat(item.hasil) || 0
    );

    const chartDataAnnotationsMin = Number(data[0]?.min) || 0;
    const chartDataAnnotationsMax = Number(data[0]?.max) || 999;

    const yaxisAnnotations = [
      {
        y: chartDataAnnotationsMin,
        borderColor: '#0000FF',
        label: {
          borderColor: '#0000FF',
          style: { color: '#fff', background: '#0000FF' },
          text: 'MIN',
        },
      }
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

    this.lineChartConfig = {
      ...this.lineChartConfig,
      title: { text: chartTitle },
      series: [{ name: 'Hasil', data: chartData }],
      xaxis: { categories: chartCategories },
      annotations: { yaxis: yaxisAnnotations },
      yaxis: {
        min: chartDataAnnotationsMin - 1,
        max: chartDataAnnotationsMax === 999 ? undefined : chartDataAnnotationsMax + 1,
      },
    };
  }
}

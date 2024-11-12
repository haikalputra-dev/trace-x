import { Component } from '@angular/core';
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
import { fadeUps } from 'src/app/utils/animation';
import { AppService } from 'src/app/shared/service/app.service';

@Component({
  selector: 'app-find-data',
  templateUrl: './find-data.component.html',
  styleUrls: ['./find-data.component.scss'],
  animations: [fadeUps],
})
export class FindDataComponent {
  breadCrumbItems!: Array<{}>;
  state = true;
  constructor(private router: Router, public service: AppService) {}
  searchName: string = '';
  lotNo: string = '';
  ijp: string = '';
  productCode: string = '';
  productName: any;
  productImage: any;
  productCategory: any;
  searchResultsText: string = '';
  arrayDataProduct: any = [];
  autocompleteResults: any = [];
  dataGeneralInformation: any = [];
  dataProduct: any = [];
  ada: boolean = false;

  dataProdidentity: any[] = [];
  selectedProduct: any;
  searchData: any;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Traceability', active: true }];
    const storedData = localStorage.getItem('product');

    this.service
      .get(`/master/products/search/byName?name=${this.searchName.trim()}`)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.arrayDataProduct = data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    this.service.get(`/master/products`).subscribe(
      (data: any) => {
        console.log(data);
        this.dataProduct = data.data.map((data: any) => {
          return {
            ...data,
            combinedLabel: `${data.product_code} - ${data.product_name}`,
          };
        });
        if (storedData) {
          this.searchData = JSON.parse(storedData);
          console.log(this.searchData);
          this.lotNo = this.searchData.lotNo;
          this.ijp = this.searchData.ijp;
          this.getProductSearch(this.lotNo, true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onProductChange(event: any) {
    console.log(event);
    const selectedData = this.dataProduct.find(
      (data: any) => data.product_code === event.kode_produk.toString()
    );
    console.log(selectedData);
    if (selectedData) {
      this.productCode = selectedData.product_code;
      this.productImage = selectedData.file;
      this.productCategory = selectedData.category;
      this.productName = selectedData.product_name;
    } else {
      this.productImage = null;
      this.productCategory = null;
    }

    const dataAsli = this.dataProdidentity.find(
      (data: any) => data.id === event.id
    );
    console.log(dataAsli);
    if (dataAsli) {
      this.dataGeneralInformation = dataAsli;
    } else {
      this.dataGeneralInformation = [];
    }
  }

  onInputLotNoSearch(event: Event) {
    console.log(event);
    let searchText = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    if (searchText === '') {
      searchText = '';
    }
    this.lotNo = searchText;
    if (searchText !== '') {
      this.service
        .get(`/master/prodidentity/search/by/lotno/groupby?lotno=${searchText}`)
        .subscribe(
          (result: any) => {
            if (result.success) {
              this.autocompleteResults = result.data;
              this.ada = true;
            } else {
              this.resetAutoComplete();
            }
          },
          (error) => {
            console.log(error);
            this.resetAutoComplete();
          }
        );
    } else {
      this.resetAutoComplete();
    }
  }

  resetAutoComplete() {
    this.autocompleteResults = [];
    this.dataProdidentity = [];
    this.selectedProduct = null;
  }

  resetSelectProduct() {
    this.productName = null;
    this.productImage = null;
    this.productCategory = null;
    this.dataProdidentity = [];
    this.selectedProduct = null;
  }

  selectResult(result: any) {
    const selectedValue = result.lotno;
    const inputElement = document.getElementById('f-lotno') as HTMLInputElement;
    this.lotNo = selectedValue;
    inputElement.value = selectedValue;
    this.autocompleteResults = [];
    this.ada = false;

    if (this.lotNo !== '') {
      this.getProductSearch(this.lotNo, false);
    } else {
      this.resetSelectProduct();
    }
  }

  getProductSearch(lotno: any, localstorage: boolean) {
    this.service
      .get(`/master/prodidentity/search/by/lotno?lotno=${lotno}`)
      .subscribe(
        (result: any) => {
          if (result.success) {
            console.log(result);
            this.productName = result.data[0].produk;
            this.dataProdidentity = result.data.map((data: any) => {
              return {
                ...data,
                combinedLabel: `${data.produk} - ${data.prod_order}`,
              };
            });

            if (localstorage) {
              console.log('a');
              this.selectedProduct =
                this.searchData.dataProdidentity.kode_produk;
              this.onProductChange(this.searchData.dataProdidentity);
            } else {
              console.log('b');
              this.selectedProduct = this.dataProdidentity[0].kode_produk;
              this.onProductChange(this.dataProdidentity[0]);
            }

            console.log(this.dataProdidentity[0]);
          } else {
            this.resetSelectProduct();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  clearInput() {
    this.lotNo = '';
    this.autocompleteResults = [];
    this.ada = false;
  }

  search(): void {
    console.log(this.productImage);
    if (this.dataProdidentity && this.dataProdidentity.length > 0) {
      if (this.productName) {
        if (this.productImage) {
          this.navigateToGeneralInformation();
          this.searchResultsText = `Showing results for "<span class="text-primary fw-medium fst-italic">${this.productName}</span>"`;
        } else {
          this.searchResultsText = `Showing results for "<span class="text-primary fw-medium fst-italic">No Product Image Found in Database </span>"`;
        }
      } else {
        this.searchResultsText = `Showing results for "<span class="text-primary fw-medium fst-italic">No Product Name Found in Database </span>"`;
      }
    } else {
      this.searchResultsText = `Showing results for "<span class="text-primary fw-medium fst-italic">No Result Found </span>"`;
    }
  }

  navigateToGeneralInformation() {
    this.state = !this.state;
    const searchData = {
      lotNo: this.lotNo,
      ijp: this.ijp,
      productCode: this.productCode,
      productName: this.productName,
      productImage: this.productImage,
      productCategory: this.productCategory,
      dataProdidentity: this.dataGeneralInformation,
    };
    console.log(searchData);
    localStorage.setItem('product', JSON.stringify(searchData));
    setTimeout(() => {
      this.router.navigate(['/trace/general-info'], {
        state: { searchData },
      });
    }, 500);
  }


}

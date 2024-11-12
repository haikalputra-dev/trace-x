import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };
  pageSize: number = 10;
  page: number = 1;
  searchTerm: string = '';
  totalRecords: any;
  totalPages: any;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  listData = [];
  currentUserLogin: any;
  breadCrumbItems!: Array<{}>;
  statusForm: any;
  dataProduct = [];
  data = [];
  idEdit: any;
  url: any;
  dataImage: any;
  translate: any;
  constructor(
    public service: AppService,
    private formBuilder: UntypedFormBuilder,
    private modal: NgbModal,
    translate: TranslateService
  ) {
    console.log(translate.getDefaultLang())
    translate.setDefaultLang('en');
  }

  public formData = this.formBuilder.group({
    product_code: [null, [Validators.required]],
    product_name: [null, [Validators.required]],
    file: [null, [Validators.required]],
  });

  get form() {
    return this.formData.controls;
  }

  @ViewChild('modalForm') modalForm: TemplateRef<any> | undefined;
  @ViewChild('modalFormImage') modalFormImage: TemplateRef<any> | undefined;
  ngOnInit(): void {
    this.loading = true;
    this.url = this.service.url();
    console.log(this.url);
    const storedData = localStorage.getItem('currentUser');
    if (storedData !== null) {
      this.currentUserLogin = JSON.parse(storedData);
    }

    this.breadCrumbItems = [
      {
        label: 'Master Data',
      },
      {
        label: 'Product',
        active: true,
      },
    ];


    this.service.get('/master/products').subscribe(
      (result) => {
        if (result.success) {
          console.log(result);
          this.loading = false;
          this.dataProduct = result.data;
          this.listData = this.dataProduct;
          this.totalRecords = this.listData.length;
          this.setPaginationData();
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );

    //  this.service.get('/master/lines').subscribe(
    //    (result) => {
    //      if (result.success) {
    //        this.loading = false;
    //        this.dataLines = result.data.map((lineItem: any) => {
    //          return {
    //            ...lineItem,
    //            combinedLabel: `${lineItem.line_code} - ${lineItem.line}`,
    //          };
    //        });
    //      } else {
    //        this.loading = false;
    //      }
    //    },
    //    (error) => {
    //      this.loading = false;
    //      console.error('Error fetching data:', error);
    //    }
    //  );

   
  }

  // Search data on table list
  onSearch() {
    if (!this.searchTerm) {
      this.listData = this.dataProduct;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.listData = this.dataProduct.filter(
        (data: { product_code: string; product_name: string }) => {
          return (
            data.product_code
              .toString()
              .toLowerCase()
              .includes(searchTermLower) ||
            data.product_name.toString().toLowerCase().includes(searchTermLower)
          );
        }
      );
    }
  }

  // Action add or edit
  onAction(status: any, data: any) {
    if (status == 'add') {
      this.statusForm = 'Add';
      this.formData.reset();
    } else if (status == 'edit') {
      this.statusForm = 'Edit';
      this.form['product_code'].setValue(data.product_code);
      this.form['product_name'].setValue(data.product_name);
      this.form['file'].setValue(data.file);
      this.idEdit = data.id;
    }
    this.modal.open(this.modalForm, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  onActionImage(data: any) {
    this.dataImage = data;
    this.modal.open(this.modalFormImage, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  // Closing all modal
  onCloseModal() {
    this.modal.dismissAll();
    this.ngOnInit();
  }

  onFileSelected(event: any, file: string) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.service.postFile('/storage/upload', formData).subscribe(
      (res: any) => {
        console.log(res);
        this.form['file']?.patchValue(res.filename);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Submit data to database (add or edit)
  onSubmit() {
    // Mark form as touched
    Object.keys(this.formData.controls).forEach((controlName) => {
      const control = this.formData.get(controlName);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.statusForm == 'Add') {
      // Add Data
      if (this.formData.valid) {
        let code = this.form['product_code'].value;
        this.service
          .checkAvailabilityProduct(code)
          .subscribe((data: any) => {
            if (data['success']) {
              this.service.warningMessage(
                'Warning!',
                'Product data already exists'
              );
            } else {
              this.service
                .post('/master/products', this.formData.value)
                .subscribe(
                  (data) => {
                    if (data.success) {
                      this.loading = false;
                      this.service.successMessage(
                        'Well Done!',
                        'Success add data'
                      );
                      this.modal.dismissAll();
                      this.ngOnInit();
                    } else {
                      this.loading = false;
                      this.service.errorMessage('Error!', 'Failed add data');
                      this.modal.dismissAll();
                      this.ngOnInit();
                    }
                  },
                  (error) => {
                    this.loading = false;
                    console.error('Error fetching data:', error);
                  }
                );
            }
          });
      } else {
        this.service.warningMessage('Warning!', 'Form is invalid');
      }
    } else if (this.statusForm == 'Edit') {
      console.log(this.formData);
      // Edit Data
      if (this.formData.valid) {
        this.service
          .put('/master/products/' + this.idEdit, this.formData.value)
          .subscribe(
            (data) => {
              if (data.success) {
                this.loading = false;
                this.service.successMessage('Well Done!', 'Success edit data');
                this.modal.dismissAll();
                this.ngOnInit();
              } else {
                this.loading = false;
                this.service.errorMessage('Error!', 'Failed edit data');
                this.modal.dismissAll();
                this.ngOnInit();
              }
            },
            (error) => {
              this.loading = false;
              console.error('Error fetching data:', error);
            }
          );
      } else {
        this.service.warningMessage('Warning!', 'Form is invalid');
      }
    }
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.service.put('/master/products/delete/' + id, '').subscribe(
          (data) => {
            if (data.success) {
              this.loading = false;
              Swal.fire({
                title: 'Deleted!',
                text: 'Your data has been deleted.',
                confirmButtonColor: '#364574',
                icon: 'success',
              });
              this.ngOnInit();
            } else {
              this.loading = false;
              this.service.errorMessage('Error!', 'Failed delete data');
              this.ngOnInit();
            }
          },
          (error) => {
            this.loading = false;
            console.error('Error fetching data:', error);
          }
        );
      }
    });
  }

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange() {
    this.startIndex = 1;
    this.endIndex = this.pageSize;
  }

  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.totalRecords);
    return `${startIndex} - ${endIndex}`;
  }
}

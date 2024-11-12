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
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss'],
})
export class StandardComponent implements OnInit {
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
  dataStandard = [];
  data = [];
  idEdit: any;
  url: any;
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
    data_item: [null, [Validators.required]],
    min: [null, [Validators.required]],
    max: [null, [Validators.required]],
    unit: [null],
    product_category: [null],
  });

  get form() {
    return this.formData.controls;
  }

  @ViewChild('modalForm') modalForm: TemplateRef<any> | undefined;

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
        label: 'Standard',
        active: true,
      },
    ];

    // Get data standard
    this.service.get('/master/standard').subscribe(
      (result) => {
        if (result.success) {
          this.loading = false;
          this.dataStandard = result.data;
          this.listData = this.dataStandard;
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
  }

  // Search data on table list
  onSearch() {
    if (!this.searchTerm) {
      this.listData = this.dataStandard;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.listData = this.dataStandard.filter((data: any) => {
        return (
          data.data_item.toString().toLowerCase().includes(searchTermLower) ||
          data.min.toString().toLowerCase().includes(searchTermLower) ||
          data.max.toString().toLowerCase().includes(searchTermLower)
        );
      });
    }
  }

  // Action add or edit
  onAction(status: any, data: any) {
    if (status == 'add') {
      this.statusForm = 'Add';
      this.formData.reset();
    } else if (status == 'edit') {
      this.statusForm = 'Edit';
      this.form['data_item'].setValue(data.data_item);
      this.form['min'].setValue(data.min);
      this.form['max'].setValue(data.max);
      this.form['unit'].setValue(data.unit);
      this.form['product_category'].setValue(data.product_category);
      this.idEdit = data.id;
    }
    this.modal.open(this.modalForm, {
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

  onSubmit() {
    Object.keys(this.formData.controls).forEach((controlName) => {
      const control = this.formData.get(controlName);
      if (control) {
        control.markAsTouched();
      }
    });
    console.log(this.formData.value);
    if (this.statusForm == 'Add') {
      if (this.formData.valid) {
        this.service.post('/master/standard', this.formData.value).subscribe(
          (data) => {
            if (data.success) {
              this.loading = false;
              this.service.successMessage('Well Done!', 'Success add data');
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
      } else {
        this.service.warningMessage('Warning!', 'Form is invalid');
      }
    } else if (this.statusForm == 'Edit') {
      console.log(this.formData);
      if (this.formData.valid) {
        this.service
          .put('/master/standard/' + this.idEdit, this.formData.value)
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
        this.service.put('/master/standard/delete/' + id, '').subscribe(
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

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss'],
})
export class DataSourceComponent implements OnInit {
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
  dataSource = [];
  data = [];
  idEdit: any;
  url: any;
  dataBase: any[] = [];
  dataLines: any[] = [];

  type_datas = [{ type: 'Table' }, { type: 'Chart' }, { type: 'Data' }];
  constructor(
    public service: AppService,
    private formBuilder: UntypedFormBuilder,
    private modal: NgbModal
  ) {}

  public formData = this.formBuilder.group({
    database: [null, [Validators.required]],
    query: [null, [Validators.required]],
    ring: [null, [Validators.required]],
    data_item: [null, [Validators.required]],
    line: [null, [Validators.required]],
    type_data: [null, [Validators.required]],
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
        label: 'Data Source',
        active: true,
      },
    ];

    // Get data database
    this.service.get('/master/datasources').subscribe(
      (result) => {
        console.log(result);
        if (result.success) {
          this.loading = false;
          this.dataSource = result.data;
          this.listData = this.dataSource;
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

    this.service.get('/master/databases').subscribe(
      (result) => {
        if (result.success) {
          this.loading = false;
          this.dataBase = result.data.map((data: any) => {
            return {
              ...data,
              combinedLabel: `${data.host} - ${data.name}`,
            };
          });
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
    this.service.get('/master/lines').subscribe(
      (result) => {
        if (result.success) {
          this.loading = false;
          this.dataLines = result.data.map((lineItem: any) => {
            return {
              ...lineItem,
              combinedLabel: `${lineItem.line_code} - ${lineItem.line}`,
            };
          });

          console.log(this.dataLines);
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
      this.listData = this.dataSource;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.listData = this.dataSource.filter((data: any) => {
        return (
          data.query.toString().toLowerCase().includes(searchTermLower) ||
          data.host.toString().toLowerCase().includes(searchTermLower) ||
          data.nama_line.toString().toLowerCase().includes(searchTermLower) ||
          data.data_item.toString().toLowerCase().includes(searchTermLower)
        );
      });
    }
  }

  // Action add or edit
  onAction(status: any, data: any) {
    console.log(data);
    if (status == 'add') {
      this.statusForm = 'Add';
      this.formData.reset();
    } else if (status == 'edit') {
      this.statusForm = 'Edit';
      this.form['database'].setValue(data.database);
      this.form['query'].setValue(data.query);
      this.form['ring'].setValue(data.ring);
      this.form['data_item'].setValue(data.data_item);
      this.form['line'].setValue(Number(data.line));
      this.form['type_data'].setValue(data.type_data);
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
        this.service.post('/master/datasources', this.formData.value).subscribe(
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
          .put('/master/datasources/' + this.idEdit, this.formData.value)
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
        this.service.put('/master/datasources/delete/' + id, '').subscribe(
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

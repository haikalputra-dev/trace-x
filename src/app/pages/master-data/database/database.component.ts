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
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
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
  dataDatabase = [];
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
    host: [null, [Validators.required]],
    name: [null, [Validators.required]],
    port: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    dialect: [null, [Validators.required]],
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
        label: 'Database',
        active: true,
      },
    ];

    // Get data database
    this.service.get('/master/databases').subscribe(
      (result) => {
        if (result.success) {
          this.loading = false;
          this.dataDatabase = result.data;
          this.listData = this.dataDatabase;
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
      this.listData = this.dataDatabase;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.listData = this.dataDatabase.filter((data: any) => {
        return (
          data.host.toString().toLowerCase().includes(searchTermLower) ||
          data.name.toString().toLowerCase().includes(searchTermLower)
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
      this.form['host'].setValue(data.host);
      this.form['name'].setValue(data.name);
      this.form['port'].setValue(data.port);
      this.form['username'].setValue(data.username);
      this.form['password'].setValue(data.password);
      this.form['dialect'].setValue(data.dialect);
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
        this.service.post('/master/databases', this.formData.value).subscribe(
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
          .put('/master/databases/' + this.idEdit, this.formData.value)
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
        this.service.put('/master/databases/delete/' + id, '').subscribe(
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

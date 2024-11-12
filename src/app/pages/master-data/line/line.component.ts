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
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
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
  dataLine = [];
  data = [];
  idEdit: any;
  url: any;

  plants = [
    { code: '1202', name: 'Sukabumi' },
    { code: '1201', name: 'ENMIX' },
    { code: '1203', name: 'Kejayan' },
  ];
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
    line: [null, [Validators.required]],
    line_code: [null, [Validators.required]],
    plant: [null, [Validators.required]],
    plant_code: [null, [Validators.required]],
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
        label: 'Line',
        active: true,
      },
    ];

    // Get data authorization
    this.service.get('/master/lines').subscribe(
      (result) => {
        if (result.success) {
          this.loading = false;
          this.dataLine = result.data;
          this.listData = this.dataLine;
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

  onPlantChange(event: any) {
    console.log(event);
    const selectedPlant = this.plants.find(
      (plant) => plant.code === event.code
    );
    console.log(selectedPlant);
    if (selectedPlant) {
      this.formData.patchValue({
        plant: selectedPlant.name,
        plant_code: selectedPlant.code,
      });
    }
  }

  // Search data on table list
  onSearch() {
    if (!this.searchTerm) {
      this.listData = this.dataLine;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.listData = this.dataLine.filter(
        (data: { line_code: string; line: string }) => {
          return (
            data.line_code.toString().toLowerCase().includes(searchTermLower) ||
            data.line.toString().toLowerCase().includes(searchTermLower)
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
      this.form['line'].setValue(data.line);
      this.form['line_code'].setValue(data.line_code);
      this.form['plant'].setValue(data.plant);
      this.form['plant_code'].setValue(data.plant_code);
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
        let line_code = this.form['line_code'].value;
        let plant_code = this.form['plant_code'].value;
        this.service.checkAvailabilityLine(line_code, plant_code).subscribe(
          (data: any) => {
            if (data['success']) {
              this.service.warningMessage(
                'Warning!',
                'Product data already exists'
              );
            } else {
              console.log('oke');
              this.service.post('/master/lines', this.formData.value).subscribe(
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
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.service.warningMessage('Warning!', 'Form is invalid');
      }
    } else if (this.statusForm == 'Edit') {
      console.log(this.formData);
      if (this.formData.valid) {
        this.service
          .put('/master/lines/' + this.idEdit, this.formData.value)
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
        this.service.put('/master/lines/delete/' + id, '').subscribe(
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

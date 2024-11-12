import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})

/**
 * Cover Component
 */
export class CoverComponent implements OnInit {
  // Login Form
  dataLogin: any;
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private authFackservice: AuthfakeauthenticationService,
    private route: ActivatedRoute,
    public toastService: ToastService) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // Login Api
    // Check whether employee data exists in the database
    this.authenticationService.login(this.f['username'].value, this.f['password'].value).subscribe((result:any) => { 
      if(result.success){
        this.dataLogin = result.data
        localStorage.setItem('token', result.data.token);
        // Check whether the employee has authorization for the application
        this.authenticationService.loginApps(result.data.nik, result.data.token).subscribe((result:any) => { 
          if(result.success){
            this.dataLogin.role = btoa(result.data[0].role)
            this.dataLogin.site = result.data[0].site
            localStorage.setItem('currentUser', JSON.stringify(this.dataLogin));
            localStorage.setItem('toast', 'true');
            this.router.navigate(['/']);
          } else {
            this.toastService.show('Employees do not have authorization into the application', { classname: 'bg-danger text-white', delay: 5000 });
          }        
        })
      } else {
        this.toastService.show('Employee Data Not Found', { classname: 'bg-danger text-white', delay: 5000 });
      }
    });

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

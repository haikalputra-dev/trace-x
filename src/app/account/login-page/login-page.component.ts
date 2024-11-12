import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { AppService } from 'src/app/shared/service/app.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
      // Login Form
      dataLogin: any;
      loginForm!: UntypedFormGroup;
      submitted = false;
      isLoading = false
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
        public service: AppService,
        public languageService: LanguageService
      ) {

        this.languageService.setLanguage('en');
       }
    
      ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        if (sessionStorage.getItem('currentUser')) {
          this.router.navigate([this.returnUrl]);
        }

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
        this.isLoading = true
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
                this.router.navigate([this.returnUrl]).then(() => {
                  window.location.reload();
                });
              } else {
                this.isLoading = false
                this.service.warningMessage("Can't Login", 'Employees do not have authorization into the application')
              }        
            })
          } else {
            this.isLoading = false
            this.service.warningMessage("Can't Login",'Employee Data Not Found');
          }
        });
      }
    
      /**
       * Password Hide/Show
       */
       toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
      }
}

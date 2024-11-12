import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

// Load Iconn
import { defineElement  } from 'lord-icon-element';
import lottie from 'lottie-web';

import { ToastsContainer } from './cover/toasts-container.component';

// Component
import { SigninRoutingModule } from './signin-routing.module';
import { BasicComponent } from './basic/basic.component';
import { CoverComponent } from './cover/cover.component';

@NgModule({
  declarations: [
    BasicComponent,
    CoverComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    SigninRoutingModule,
    NgbToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigninModule { 
  constructor() {
    defineElement (lottie.loadAnimation);
  }
}

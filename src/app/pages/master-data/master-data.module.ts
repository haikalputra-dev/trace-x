import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbAccordionModule,
  NgbTooltipModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Select Drop down
import { NgSelectModule } from '@ng-select/ng-select';

// Flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Ng Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { SharedModule } from '../../shared/shared.module';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProductComponent } from './product/product.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TitleCasePipe } from '../../utils/pipes/title-case.pipe';
import { LineComponent } from './line/line.component';
import { DatabaseComponent } from './database/database.component';
import { DataSourceComponent } from './data-source/data-source.component';
import { StandardComponent } from './standard/standard.component';
@NgModule({
  declarations: [
    AuthorizationComponent,
    ProductComponent,
    TitleCasePipe,
    LineComponent,
    DatabaseComponent,
    DataSourceComponent,
    StandardComponent,
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgxUsefulSwiperModule,
    NgSelectModule,
    FlatpickrModule,
    FeatherModule.pick(allIcons),
    Ng2SearchPipeModule,
    SharedModule,
    NgxLoadingModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterDataModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}

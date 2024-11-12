import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbPaginationModule,
  NgbNavModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './template/dashboards/dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard/dashboard.component';
import { ToastsContainer } from './template/dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from './template/dashboards/dashboards.module';
import { AppsModule } from './template/apps/apps.module';
import { EcommerceModule } from './template/ecommerce/ecommerce.module';
import { ProtraceComponent } from './protrace/protrace.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { DetailRingOneComponent } from './details/detail-ring-one/detail-ring-one.component';
import { DetailRingTwoComponent } from './details/detail-ring-two/detail-ring-two.component';
import { DetailRingThreeComponent } from './details/detail-ring-three/detail-ring-three.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MachineDetailRingOneComponent } from './details/machine/machine-detail-ring-one/machine-detail-ring-one.component';
import { MachineDetailRingTwoComponent } from './details/machine/machine-detail-ring-two/machine-detail-ring-two.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
  IConfig,
} from 'ngx-mask';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@NgModule({
  declarations: [
    DashboardComponent,
    Dashboard2Component,
    ToastsContainer,
    ProtraceComponent,
    GeneralInformationComponent,
    DetailRingOneComponent,
    DetailRingTwoComponent,
    DetailRingThreeComponent,
    MachineDetailRingOneComponent,
    MachineDetailRingTwoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    NgSelectModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    FeatherModule.pick(allIcons),
    CountToModule,
    NgApexchartsModule,
    HighchartsChartModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    DashboardsModule,
    AppsModule,
    EcommerceModule,
    NgbNavModule,
    NgbPaginationModule,
    NgxLoadingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgbAccordionModule,
    NgxSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}

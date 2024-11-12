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
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';
import { NgxLoadingModule } from 'ngx-loading';
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
import { TraceRoutingModule } from './trace-routing.module';
import { FindDataComponent } from './find-data/find-data.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
// ring one
import { DetailRingOneComponent } from './ring-one/detail-ring-one/detail-ring-one.component';
import { IPCQualityResultComponent } from './ring-one/ipcquality-result/ipcquality-result.component';
import { MicrobiologyResultComponent } from './ring-one/microbiology-result/microbiology-result.component';
import { BottleDimensionComponent } from './ring-one/bottle-dimension/bottle-dimension.component';
import { CappingPerformanceComponent } from './ring-one/capping-performance/capping-performance.component';
import { PreformCheckComponent } from './ring-one/preform-check/preform-check.component';
import { CCPResultComponent } from './ring-one/ccpresult/ccpresult.component';
import { PreparationSyrupComponent } from './ring-one/preparation-syrup/preparation-syrup.component';
import { AbnormallyResultComponent } from './ring-one/abnormally-result/abnormally-result.component';
import { OperatorManualInspComponent } from './ring-one/operator-manual-insp/operator-manual-insp.component';
import { BottlePressureComponent } from './ring-one/bottle-pressure/bottle-pressure.component';
import { PackagingMaterialComponent } from './ring-one/packaging-material/packaging-material.component';


//ring two  
import { DetailRingTwoComponent } from './ring-two/detail-ring-two/detail-ring-two.component';
import { ProductionMachineUtilityComponent } from './ring-two/production-machine-utility/production-machine-utility.component';
import { CleaningSanitationComponent } from './ring-two/cleaning-sanitation/cleaning-sanitation.component';
import { InspectionResultCameraComponent } from './ring-two/inspection-result-camera/inspection-result-camera.component';
import { InspectionExternalComponent } from './ring-two/inspection-external/inspection-external.component';
import { WaterPerformanceComponent } from './ring-two/water-performance/water-performance.component';

//ring three
import { DetailRingThreeComponent } from './ring-three/detail-ring-three/detail-ring-three.component';
import { ProductPalletComponent } from './ring-three/product-pallet/product-pallet.component';
import { ProductDestinationComponent } from './ring-three/product-destination/product-destination.component';
import { TruckingComponent } from './ring-three/trucking/trucking.component';
import { ProductionMachineDataComponent } from './ring-two/production-machine-data/production-machine-data.component';
import { ProductionMachineUtilityPreparationComponent } from './ring-two/production-machine-utility/preparation/production-machine-utility-preparation.component';
import { ProductionMachineUtilityInjectionComponent } from './ring-two/production-machine-utility/injection/production-machine-utility-injection.component';
import { ProductionMachineUtilityBlowComponent } from './ring-two/production-machine-utility/blow/production-machine-utility-blow.component';
import { ProductionMachineUtilityFillerComponent } from './ring-two/production-machine-utility/filler/production-machine-utility-filler.component';
import { ProductionMachineUtilityLn2Component } from './ring-two/production-machine-utility/ln2/production-machine-utility-ln2.component';
import { ProductionMachineUtilityCaperComponent } from './ring-two/production-machine-utility/caper/production-machine-utility-caper.component';
import { ProductionMachineUtilityCscComponent } from './ring-two/production-machine-utility/csc/production-machine-utility-csc.component';
import { ProductionMachineUtilityLabelComponent } from './ring-two/production-machine-utility/label/production-machine-utility-label.component';
import { ProductionMachineUtilityCaserComponent } from './ring-two/production-machine-utility/caser/production-machine-utility-caser.component';
import { ProductionMachineDataFillerComponent } from './ring-two/production-machine-data/filler/production-machine-data-filler.component';
import { ProductionMachineDataBlowComponent } from './ring-two/production-machine-data/blow/production-machine-data-blow.component';
import { ProductionMachineDataInjectionComponent } from './ring-two/production-machine-data/injection/production-machine-data-injection.component';
import { ProductionMachineDataPreparationComponent } from './ring-two/production-machine-data/preparation/production-machine-data-preparation.component';
import { ProductionMachineDataCaserComponent } from './ring-two/production-machine-data/caser/production-machine-data-caser.component';
import { ProductionMachineDataPackingComponent } from './ring-two/production-machine-data/packing/production-machine-data-packing.component';
import { LabelAreaOc3Component } from './ring-two/inspection-result-camera/label-area-oc3/label-area-oc3.component';
import { IjpAreaOc3Component } from './ring-two/inspection-result-camera/ijp-area-oc3/ijp-area-oc3.component';
import { CapAreaOc3Component } from './ring-two/inspection-result-camera/cap-area-oc3/cap-area-oc3.component';



@NgModule({
  declarations: [
    FindDataComponent,
    GeneralInfoComponent,
    DetailRingOneComponent,
    IPCQualityResultComponent,
    MicrobiologyResultComponent,
    BottleDimensionComponent,
    CappingPerformanceComponent,
    PreformCheckComponent,
    CCPResultComponent,
    PreparationSyrupComponent,
    AbnormallyResultComponent,
    OperatorManualInspComponent,
    BottlePressureComponent,
    PackagingMaterialComponent,
    DetailRingTwoComponent,
    ProductionMachineUtilityComponent,
    CleaningSanitationComponent,
    InspectionResultCameraComponent,
    InspectionExternalComponent,
    WaterPerformanceComponent,
    DetailRingThreeComponent,
    ProductPalletComponent,
    ProductDestinationComponent,
    TruckingComponent,
    ProductionMachineDataComponent,
    ProductionMachineUtilityPreparationComponent,
    ProductionMachineUtilityInjectionComponent,
    ProductionMachineUtilityBlowComponent,
    ProductionMachineUtilityFillerComponent,
    ProductionMachineUtilityLn2Component,
    ProductionMachineUtilityCaperComponent,
    ProductionMachineUtilityCscComponent,
    ProductionMachineUtilityLabelComponent,
    ProductionMachineUtilityCaserComponent,
    ProductionMachineDataFillerComponent,
    ProductionMachineDataBlowComponent,
    ProductionMachineDataInjectionComponent,
    ProductionMachineDataPreparationComponent,
    ProductionMachineDataCaserComponent,
    ProductionMachineDataPackingComponent,
    LabelAreaOc3Component,
    IjpAreaOc3Component,
    CapAreaOc3Component,
  ],
  imports: [
    CommonModule,
    TraceRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatTableModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
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
    FlatpickrModule,
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    SimplebarAngularModule,
    FeatherModule.pick(allIcons),
    NgxUsefulSwiperModule,
    LightboxModule,
    FormsModule,
    SharedModule,
    WidgetModule,
    NgxLoadingModule,
    NgSelectModule,
    HighchartsChartModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TraceModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindDataComponent } from './find-data/find-data.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { DetailRingOneComponent } from './ring-one/detail-ring-one/detail-ring-one.component';
import { DetailRingTwoComponent } from './ring-two/detail-ring-two/detail-ring-two.component';
import { DetailRingThreeComponent } from './ring-three/detail-ring-three/detail-ring-three.component';

const routes: Routes = [
  {
  path: '',
  component: FindDataComponent,
  },
  {
    path: 'general-info',
    component: GeneralInfoComponent,
  },
  {
    path: 'ring-one',
    component: DetailRingOneComponent,
  },
  {
    path: 'ring-two',
    component: DetailRingTwoComponent,
  },
  {
    path: 'ring-three',
    component: DetailRingThreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraceRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { Dashboard2Component } from './dashboard/dashboard.component';
import { ProtraceComponent } from './protrace/protrace.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { DetailRingOneComponent } from './details/detail-ring-one/detail-ring-one.component';
import { DetailRingTwoComponent } from './details/detail-ring-two/detail-ring-two.component';
import { DetailRingThreeComponent } from './details/detail-ring-three/detail-ring-three.component';
import { MachineDetailRingOneComponent } from './details/machine/machine-detail-ring-one/machine-detail-ring-one.component';
import { MachineDetailRingTwoComponent } from './details/machine/machine-detail-ring-two/machine-detail-ring-two.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard2Component,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'traceability',
    component: ProtraceComponent,
  },
  {
    path: 'protrace/general-information',
    component: GeneralInformationComponent,
  },
  {
    path: 'protrace/detail/ring-one',
    component: DetailRingOneComponent,
  },
  {
    path: 'protrace/detail/ring-two',
    component: DetailRingTwoComponent,
  },
  {
    path: 'protrace/detail/ring-three',
    component: DetailRingThreeComponent,
  },
  {
    path: 'protrace/detail/machine/ring-one',
    component: MachineDetailRingOneComponent,
  },
  {
    path: 'protrace/detail/machine/ring-two',
    component: MachineDetailRingTwoComponent,
  },
  {
    path: 'master-data',
    loadChildren: () =>
      import('./master-data/master-data.module').then(
        (m) => m.MasterDataModule
      ),
  },

  {
    path: 'trace',
    loadChildren: () =>
      import('./trace/trace.module').then(
        (m) => m.TraceModule
      ),
  },


  // =================================

  {
    path: 'dashboards',
    loadChildren: () =>
      import('./template/dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'apps',
    loadChildren: () => import('./template/apps/apps.module').then((m) => m.AppsModule),
  },
  {
    path: 'ecommerce',
    loadChildren: () =>
      import('./template/ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./template/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./template/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'crm',
    loadChildren: () => import('./template/crm/crm.module').then((m) => m.CrmModule),
  },
  {
    path: 'crypto',
    loadChildren: () =>
      import('./template/crypto/crypto.module').then((m) => m.CryptoModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./template/invoices/invoices.module').then((m) => m.InvoicesModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./template/tickets/tickets.module').then((m) => m.TicketsModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./template/extrapages/extraspages.module').then(
        (m) => m.ExtraspagesModule
      ),
  },
  {
    path: 'ui',
    loadChildren: () => import('./template/ui/ui.module').then((m) => m.UiModule),
  },
  {
    path: 'advance-ui',
    loadChildren: () =>
      import('./template/advance-ui/advance-ui.module').then((m) => m.AdvanceUiModule),
  },
  {
    path: 'forms',
    loadChildren: () => import('./template/form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./template/tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./template/charts/charts.module').then((m) => m.ChartsModule),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./template/icons/icons.module').then((m) => m.IconsModule),
  },
  {
    path: 'maps',
    loadChildren: () => import('./template/maps/maps.module').then((m) => m.MapsModule),
  },
  {
    path: 'marletplace',
    loadChildren: () =>
      import('./template/nft-marketplace/nft-marketplace.module').then(
        (m) => m.NftMarketplaceModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProductComponent } from './product/product.component';
import { LineComponent } from './line/line.component';
import { DatabaseComponent } from './database/database.component';
import { DataSourceComponent } from './data-source/data-source.component';
import { StandardComponent } from './standard/standard.component';

const masterDataRoutes: Routes = [
  // {
  //   path: 'signin', loadChildren: () => import('./auth/signin/signin.module').then(m => m.SigninModule)
  // },
  {
    path: 'authorization',
    component: AuthorizationComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'line',
    component: LineComponent,
  },
  {
    path: 'database',
    component: DatabaseComponent,
  },
  {
    path: 'data-source',
    component: DataSourceComponent,
  },
  {
    path: 'standard',
    component: StandardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(masterDataRoutes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}

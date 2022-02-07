import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { CapGroupComponent } from './capgroup/components/list/list-capgroup.component';
import { CapTypeComponent } from './captype/components/list/list-captype.component';
import { CapUnitComponent } from './capunit/components/list/list-capunit.component';
import { SalesProductComponent } from './salesproduct/components/list/list-salesproduct.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    children: [
      {
        path: 'masterdata/production/capgroup',
        component: CapGroupComponent,
      },
      {
        path: 'masterdata/production/captype',
        component: CapTypeComponent,
      },
      {
        path: 'masterdata/production/capunit',
        component: CapUnitComponent,
      },
      {
        path: 'masterdata/production/salesproduct',
        component: SalesProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { CostAccountComponent } from './costaccount/components/list/list-costaccount.component';
import { CostAccountingTypeComponent } from './costacctype/components/list/list-costacctype.component';
import { CostAllocationComponent } from './costallocation/components/list/list-costallocation.component';
import { CostCenterComponent } from './costcenter/components/list/list-costcenter.component';
import { CostGroupComponent } from './costgroup/components/list/list-costgroup.component';
import { CostRespComponent } from './costresp/components/list/list-costresp.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    children: [
      {
        path: 'masterdata/planning/costacctype',
        component: CostAccountingTypeComponent,
      },
      {
        path: 'masterdata/planning/costgroup',
        component: CostGroupComponent,
      },
      {
        path: 'masterdata/planning/costcenter',
        component: CostCenterComponent,
      },
      {
        path: 'masterdata/planning/costresp',
        component: CostRespComponent,
      },
      {
        path: 'masterdata/planning/costaccount',
        component: CostAccountComponent,
      },
      {
        path: 'masterdata/planning/costallocation',
        component: CostAllocationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}

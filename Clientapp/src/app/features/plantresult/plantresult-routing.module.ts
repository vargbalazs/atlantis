import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { BrowseDataComponent } from './browsedata/components/list/list.component';
import { CostCenterDetailsComponent } from './reports/costcenter/components/details/details.component';
import { CostCenterOverviewComponent } from './reports/costcenter/components/overview/overview.component';
import { PlantPlOverviewComponent } from './reports/plantpl/components/overview/plantpl.component';
import { WizardComponent } from './uploadcost/components/wizard/wizard.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    children: [
      {
        path: 'plantresult/uploadcost',
        component: WizardComponent,
      },
      { path: 'plantresult/browsedata', component: BrowseDataComponent },
      {
        path: 'plantresult/costcenter',
        component: CostCenterOverviewComponent,
      },
      {
        path: 'plantresult/costcenter/details',
        component: CostCenterDetailsComponent,
      },
      {
        path: 'plantresult/costcenter/details/bookings',
        component: BrowseDataComponent,
      },
      { path: 'plantresult/plantpl', component: PlantPlOverviewComponent },
      { path: 'plantresult/plantpl/bookings', component: BrowseDataComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantResultRoutingModule {}

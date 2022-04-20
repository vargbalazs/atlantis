import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CapPlanningItemsComponent } from './capplanning/components/planningitems/planningitems.component';
import { CostPlanningItemsComponent } from './costplanning/components/planningitems/planningitems.component';
import { HcPlanningItemsComponent } from './hcplanning/components/planningitems/planningitems.component';
import { PlanningVersionComponent } from './versions/components/list/list-version.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'planning/version',
        component: PlanningVersionComponent,
      },
      {
        path: 'planning/costplanning',
        component: CostPlanningItemsComponent,
      },
      {
        path: 'planning/hcplanning',
        component: HcPlanningItemsComponent,
      },
      {
        path: 'planning/capplanning',
        component: CapPlanningItemsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}

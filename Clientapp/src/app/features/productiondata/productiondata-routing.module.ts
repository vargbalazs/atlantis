import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ActProdDataComponent } from './actual/components/list/list-actual.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'productiondata/actual',
        component: ActProdDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionDataRoutingModule {}

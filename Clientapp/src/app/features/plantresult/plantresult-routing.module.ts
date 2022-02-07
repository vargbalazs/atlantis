import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantResultRoutingModule {}

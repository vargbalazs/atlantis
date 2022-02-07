import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { FrcDetailsComponent } from './frc/components/details/details.component';
import { FrcComponent } from './frc/components/list/list-frc.component';
import { ProvkDetailsComponent } from './provk/components/details/details.component';
import { ProvkComponent } from './provk/components/list/list-provk.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    children: [
      {
        path: 'forecast/provk',
        component: ProvkComponent,
      },
      {
        path: 'forecast/provk/details',
        component: ProvkDetailsComponent,
      },
      {
        path: 'forecast/frc',
        component: FrcComponent,
      },
      {
        path: 'forecast/frc/details',
        component: FrcDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}

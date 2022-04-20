import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CompanyComponent } from 'src/app/features/masterdata/general/company/components/list/list-company.component';
import { DepartmentComponent } from './department/components/list/list-department.component';
import { JobComponent } from './job/components/list/list-job.component';
import { LanguageComponent } from './language/components/list/list-lang.component';
import { PlantComponent } from './plant/components/list/list-plant.component';
import { PlantAreaComponent } from './plantarea/components/list/list-plantarea.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'masterdata/general/company',
        component: CompanyComponent,
      },
      {
        path: 'masterdata/general/plant',
        component: PlantComponent,
      },
      {
        path: 'masterdata/general/plantarea',
        component: PlantAreaComponent,
      },
      {
        path: 'masterdata/general/department',
        component: DepartmentComponent,
      },
      {
        path: 'masterdata/general/job',
        component: JobComponent,
      },
      {
        path: 'masterdata/general/language',
        component: LanguageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}

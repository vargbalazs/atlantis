import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from 'src/app/features/masterdata/general/company/company.module';
import { PlantModule } from 'src/app/features/masterdata/general/plant/plant.module';
import { PlantAreaModule } from './plantarea/plantarea.module';
import { DepartmentModule } from './department/department.module';
import { JobModule } from './job/job.module';
import { LanguageModule } from './language/lang.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyModule,
    PlantModule,
    PlantAreaModule,
    DepartmentModule,
    JobModule,
    LanguageModule,
  ],
  providers: [],
  exports: [],
})
export class GeneralModule {}

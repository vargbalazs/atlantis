import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterOverviewModule } from './costcenter/components/overview/overview.module';
import { CostCenterDetailsModule } from './costcenter/components/details/details.module';
import { PlantPlOverviewModule } from './plantpl/components/overview/plantpl.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CostCenterOverviewModule,
    CostCenterDetailsModule,
    PlantPlOverviewModule,
  ],
  providers: [],
  exports: [],
})
export class ReportModule {}

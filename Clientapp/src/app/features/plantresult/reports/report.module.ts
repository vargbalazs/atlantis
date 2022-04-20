import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterOverviewModule } from './costcenter/components/overview/overview.module';
import { CostCenterDetailsModule } from './costcenter/components/details/details.module';
import { PlantPlOverviewModule } from './plantpl/components/overview/plantpl.module';
import { ReportService } from 'src/app/shared/services/report.service';
import { CostCenterReportService } from './costcenter/services/costcenter-report.service';
import { PlantPlReportService } from './plantpl/services/plantpl-report.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CostCenterOverviewModule,
    CostCenterDetailsModule,
    PlantPlOverviewModule,
  ],
  providers: [ReportService, CostCenterReportService, PlantPlReportService],
  exports: [],
})
export class ReportModule {}

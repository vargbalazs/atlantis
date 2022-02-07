import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningVersionModule } from './versions/version.module';
import { CostPlanningModule } from './costplanning/costplanning.module';
import { HcPlanningModule } from './hcplanning/hcplanning.module';
import { CapPlanningModule } from './capplanning/capplanning.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlanningVersionModule,
    CostPlanningModule,
    HcPlanningModule,
    CapPlanningModule,
  ],
  providers: [],
  exports: [],
})
export class PlanningModule {}

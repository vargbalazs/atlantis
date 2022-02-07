import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostAccountingTypeModule } from './costacctype/costacctype.module';
import { CostGroupModule } from './costgroup/costgroup.module';
import { CostCenterModule } from './costcenter/costcenter.module';
import { CostRespModule } from './costresp/costresp.module';
import { CostAccountModule } from './costaccount/costaccount.model';
import { CostAllocationModule } from './costallocation/costallocation.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CostAccountingTypeModule,
    CostGroupModule,
    CostCenterModule,
    CostRespModule,
    CostAccountModule,
    CostAllocationModule,
  ],
  providers: [],
  exports: [],
})
export class PlanningModule {}

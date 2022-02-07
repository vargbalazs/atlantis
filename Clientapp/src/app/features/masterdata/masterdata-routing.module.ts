import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general/general-routing.module';
import { PlanningRoutingModule } from './planning/planning-routing.module';
import { ProductionRoutingModule } from './production/production-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    PlanningRoutingModule,
    ProductionRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class MasterDataRoutingModule {}

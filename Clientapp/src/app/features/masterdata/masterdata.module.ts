import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from './general/general.module';
import { PlanningModule } from './planning/planning.module';
import { ProductionModule } from './production/production.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GeneralModule, PlanningModule, ProductionModule],
  providers: [],
  exports: [],
})
export class MasterDataModule {}

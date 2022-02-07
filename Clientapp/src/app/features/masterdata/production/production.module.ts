import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapGroupModule } from './capgroup/capgroup.module';
import { CapTypeModule } from './captype/captype.module';
import { CapUnitModule } from './capunit/capunit.module';
import { SalesProductModule } from './salesproduct/salesproduct.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CapGroupModule,
    CapTypeModule,
    CapUnitModule,
    SalesProductModule,
  ],
  providers: [],
  exports: [],
})
export class ProductionModule {}

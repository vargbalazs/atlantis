import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvkModule } from './provk/provk.module';
import { FrcModule } from './frc/frc.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProvkModule, FrcModule],
  providers: [],
  exports: [],
})
export class ForecastModule {}

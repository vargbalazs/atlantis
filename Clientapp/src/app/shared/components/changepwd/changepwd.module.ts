import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePwdComponent } from './changepwd.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
  declarations: [ChangePwdComponent],
  imports: [
    InputsModule,
    CommonModule,
    IconsModule,
    ButtonsModule,
    LabelModule,
    ReactiveFormsModule,
    TooltipModule,
    IndicatorsModule,
  ],
  providers: [],
  exports: [ChangePwdComponent],
})
export class ChangePwdModule {}

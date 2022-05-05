import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCostCenterComponent } from './ce-costcenter.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditCostCenterComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DropDownsModule,
    DateInputsModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CreateEditCostCenterComponent],
})
export class CreateEditCostCenterModule {}

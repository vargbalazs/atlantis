import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCostAllocationComponent } from './ce-costallocation.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditCostAllocationComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DropDownsModule,
    DatePickerModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CreateEditCostAllocationComponent],
})
export class CreateEditCostAllocationModule {}

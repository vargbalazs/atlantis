import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditPlanningVersionComponent } from './ce-version.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  declarations: [CreateEditPlanningVersionComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DropDownsModule,
    DateInputsModule,
  ],
  providers: [],
  exports: [CreateEditPlanningVersionComponent],
})
export class CreateEditPlanningVersionModule {}

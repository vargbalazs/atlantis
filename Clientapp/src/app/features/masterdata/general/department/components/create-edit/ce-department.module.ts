import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditDepartmentComponent } from './ce-department.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [CreateEditDepartmentComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DropDownsModule,
  ],
  providers: [],
  exports: [CreateEditDepartmentComponent],
})
export class CreateEditDepartmentModule {}

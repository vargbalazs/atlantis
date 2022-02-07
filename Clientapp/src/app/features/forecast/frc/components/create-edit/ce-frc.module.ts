import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditFrcComponent } from './ce-frc.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [CreateEditFrcComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
  ],
  providers: [],
  exports: [CreateEditFrcComponent],
})
export class CreateEditFrcModule {}

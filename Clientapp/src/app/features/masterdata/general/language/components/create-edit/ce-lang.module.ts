import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditLanguageComponent } from './ce-lang.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [CreateEditLanguageComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
  ],
  providers: [],
  exports: [CreateEditLanguageComponent],
})
export class CreateEditLanguageModule {}
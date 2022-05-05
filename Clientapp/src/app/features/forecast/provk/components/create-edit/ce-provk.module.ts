import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditProvkComponent } from './ce-provk.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditProvkComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DateInputsModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CreateEditProvkComponent],
})
export class CreateEditProvkModule {}

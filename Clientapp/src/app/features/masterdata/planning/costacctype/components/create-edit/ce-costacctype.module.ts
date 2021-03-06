import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCostAccountingTypeComponent } from './ce-costacctype.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditCostAccountingTypeComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CreateEditCostAccountingTypeComponent],
})
export class CreateEditCostAccountingTypeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditPlantAreaComponent } from './ce-plantarea.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditPlantAreaComponent],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    DropDownsModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CreateEditPlantAreaComponent],
})
export class CreateEditPlantAreaModule {}

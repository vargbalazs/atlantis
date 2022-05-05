import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCapUnitComponent } from './ce-capunit.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateEditCapUnitComponent],
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
  exports: [CreateEditCapUnitComponent],
})
export class CreateEditCapUnitModule {}

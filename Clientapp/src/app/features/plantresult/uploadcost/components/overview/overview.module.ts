import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { OverviewComponent } from './overview.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    TranslateModule,
  ],
  providers: [],
  exports: [OverviewComponent],
})
export class OverviewModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpComponent } from './signup.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LangSelectorModule } from '../langselector/langselector.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    InputsModule,
    CommonModule,
    IconsModule,
    ButtonsModule,
    LayoutModule,
    LabelModule,
    LangSelectorModule,
    ReactiveFormsModule,
    TooltipModule,
    IndicatorsModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [],
  exports: [SignUpComponent],
})
export class SignUpModule {}

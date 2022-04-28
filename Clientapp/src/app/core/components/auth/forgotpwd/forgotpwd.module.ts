import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPwdComponent } from './forgotpwd.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LangSelectorModule } from '../langselector/langselector.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ForgotPwdComponent],
  imports: [
    InputsModule,
    CommonModule,
    IconsModule,
    ButtonsModule,
    LayoutModule,
    LabelModule,
    LangSelectorModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
    NotificationModule,
    TranslateModule,
  ],
  providers: [],
  exports: [ForgotPwdComponent],
})
export class ForgotPwdModule {}

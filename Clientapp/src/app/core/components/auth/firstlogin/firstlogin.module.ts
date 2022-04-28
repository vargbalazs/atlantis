import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstLoginComponent } from './firstlogin.component';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ChangePwdModule } from 'src/app/shared/components/changepwd/changepwd.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FirstLoginComponent],
  imports: [
    CommonModule,
    ButtonModule,
    LayoutModule,
    LoadingOverlayModule,
    ChangePwdModule,
    TranslateModule,
  ],
  providers: [],
  exports: [FirstLoginComponent],
})
export class FirstLoginModule {}

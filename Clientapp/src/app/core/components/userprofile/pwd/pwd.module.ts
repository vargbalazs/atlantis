import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwdComponent } from './pwd.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ChangePwdModule } from 'src/app/shared/components/changepwd/changepwd.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PwdComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    ChangePwdModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [],
  exports: [PwdComponent],
})
export class PwdModule {}

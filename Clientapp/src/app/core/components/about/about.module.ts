import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, DialogModule, ButtonsModule, TranslateModule],
  providers: [],
  exports: [AboutComponent],
})
export class AboutModule {}

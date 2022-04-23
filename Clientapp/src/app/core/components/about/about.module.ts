import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, DialogModule, ButtonsModule],
  providers: [],
  exports: [AboutComponent],
})
export class AboutModule {}

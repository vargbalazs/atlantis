import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './errorpage.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, TranslateModule],
  providers: [],
  exports: [],
})
export class ErrorPageModule {}

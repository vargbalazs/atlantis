import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondFormatComponent } from './cond-format.component';
import { IconsModule } from '@progress/kendo-angular-icons';

@NgModule({
  declarations: [CondFormatComponent],
  imports: [CommonModule, IconsModule],
  providers: [],
  exports: [CondFormatComponent],
})
export class CondFormatModule {}

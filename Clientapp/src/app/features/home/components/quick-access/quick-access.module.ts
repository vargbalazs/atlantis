import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessComponent } from './quick-access.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [QuickAccessComponent],
  imports: [CommonModule, LayoutModule],
  providers: [],
  exports: [QuickAccessComponent],
})
export class QuickAccessModule {}

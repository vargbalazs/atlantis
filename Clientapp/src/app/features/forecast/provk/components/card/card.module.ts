import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvkCardComponent } from './card.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ProvkCardComponent],
  imports: [CommonModule, LayoutModule, ButtonsModule, IconsModule],
  providers: [],
  exports: [ProvkCardComponent],
})
export class ProvkCardModule {}

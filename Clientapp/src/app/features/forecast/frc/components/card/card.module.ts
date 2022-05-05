import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrcCardComponent } from './card.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FrcCardComponent],
  imports: [CommonModule, LayoutModule, ButtonsModule, IconsModule, TranslateModule],
  providers: [],
  exports: [FrcCardComponent],
})
export class FrcCardModule {}

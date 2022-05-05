import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvkCardComponent } from './card.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProvkCardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ButtonsModule,
    IconsModule,
    TranslateModule,
  ],
  providers: [],
  exports: [ProvkCardComponent],
})
export class ProvkCardModule {}

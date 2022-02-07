import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './appbar.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { UserMenuModule } from '../usermenu/usermenu.module';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [AppBarComponent],
  imports: [
    CommonModule,
    NavigationModule,
    IconsModule,
    ButtonsModule,
    LayoutModule,
    PopupModule,
    UserMenuModule,
    InputsModule,
  ],
  providers: [],
  exports: [AppBarComponent],
})
export class AppBarModule {}

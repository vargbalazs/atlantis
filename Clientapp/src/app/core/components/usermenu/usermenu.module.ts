import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './usermenu.component';
import { MenuModule } from '@progress/kendo-angular-menu';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, MenuModule],
  providers: [],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './usermenu.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { UserProfileModule } from '../userprofile/userprofile.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MenuModule,
    UserProfileModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}

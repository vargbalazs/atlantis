import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './details.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    ListViewModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}

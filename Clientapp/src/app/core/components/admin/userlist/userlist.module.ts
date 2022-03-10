import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './userlist.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { UserDetailsModule } from '../details/details.module';
import { UserEditModule } from '../edit/edit.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    UserDetailsModule,
    UserEditModule,
  ],
  providers: [],
  exports: [UserListComponent],
})
export class UserListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './userprofile.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PwdModule } from './pwd/pwd.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ListViewModule,
    PwdModule,
    ConfirmDialogStyleModule,
  ],
  providers: [],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}

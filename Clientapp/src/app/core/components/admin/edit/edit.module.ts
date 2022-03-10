import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './edit.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ListViewModule } from '@progress/kendo-angular-listview';

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ListViewModule,
  ],
  providers: [],
  exports: [UserEditComponent],
})
export class UserEditModule {}

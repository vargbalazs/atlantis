import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './list-department.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditDepartmentModule } from 'src/app/features/masterdata/general/department/components/create-edit/ce-department.module';
import { DepartmentService } from '../../services/department.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditDepartmentModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [DepartmentService],
  exports: [DepartmentComponent],
})
export class ListDepartmentModule {}

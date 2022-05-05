import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostGroupComponent } from './list-costgroup.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostGroupModule } from 'src/app/features/masterdata/planning/costgroup/components/create-edit/ce-costgroup.module';
import { CostGroupService } from '../../services/costgroup.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CostGroupComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditCostGroupModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [CostGroupService],
  exports: [CostGroupComponent],
})
export class ListCostGroupModule {}

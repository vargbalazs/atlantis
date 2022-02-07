import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterComponent } from './list-costcenter.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostCenterModule } from 'src/app/features/masterdata/planning/costcenter/components/create-edit/ce-costcenter.module';
import { CostCenterService } from '../../services/costcenter.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CopyModule } from '../../../../../../shared/components/copy-entity/copy.module';
import { CopyService } from '../../services/copy.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CostCenterComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCostCenterModule,
    CopyModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CostCenterService, CopyService],
  exports: [CostCenterComponent],
})
export class ListCostCenterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostAccountingTypeComponent } from './list-costacctype.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostAccountingTypeModule } from 'src/app/features/masterdata/planning/costacctype/components/create-edit/ce-costacctype.module';
import { CostAccountingTypeService } from '../../services/costacctype.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CostAccountingTypeComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditCostAccountingTypeModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CostAccountingTypeService],
  exports: [CostAccountingTypeComponent],
})
export class ListCostAccountingTypeModule {}

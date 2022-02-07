import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostRespComponent } from './list-costresp.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostRespModule } from 'src/app/features/masterdata/planning/costresp/components/create-edit/ce-costresp.module';
import { CostRespService } from '../../services/costresp.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CostRespComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditCostRespModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CostRespService],
  exports: [CostRespComponent],
})
export class ListCostRespModule {}

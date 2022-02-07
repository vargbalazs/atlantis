import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostAllocationComponent } from './list-costallocation.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostAllocationModule } from 'src/app/features/masterdata/planning/costallocation/components/create-edit/ce-costallocation.module';
import { CostAllocationService } from '../../services/costallocation.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AllocationDetailsModule } from '../allocation-details/allocation-details.module';
import { CopyModule } from 'src/app/shared/components/copy-entity/copy.module';
import { CopyService } from '../../services/copy.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CostAllocationComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCostAllocationModule,
    LoadingOverlayModule,
    AllocationDetailsModule,
    CopyModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CostAllocationService, CopyService],
  exports: [CostAllocationComponent],
})
export class ListCostAllocationModule {}

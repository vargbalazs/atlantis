import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostPlanningItemsComponent } from './planningitems.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { CostPlanningService } from '../../services/costplanning.service';
import { CreateEditPlanningItemModule } from '../create-edit/ce-planningitem.module';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { CreateEditTaskModule } from '../../../../../shared/components/task/task.module';
import { TaskService } from '../../../../../shared/services/task.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CostPlanningItemsComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    LoadingOverlayModule,
    ReactiveFormsModule,
    FilterModule,
    CreateEditPlanningItemModule,
    ContextMenuModule,
    CreateEditTaskModule,
    ExcelModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CostPlanningService, TaskService],
  exports: [CostPlanningItemsComponent],
})
export class ListCostPlanningItemsModule {}

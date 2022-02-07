import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningVersionComponent } from './list-version.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditPlanningVersionModule } from '../create-edit/ce-version.module';
import { PlanningVersionService } from '../../services/version.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [PlanningVersionComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditPlanningVersionModule,
    LoadingOverlayModule,
  ],
  providers: [PlanningVersionService],
  exports: [PlanningVersionComponent],
})
export class ListPlanningVersionModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantAreaComponent } from './list-plantarea.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditPlantAreaModule } from 'src/app/features/masterdata/general/plantarea/components/create-edit/ce-plantarea.module';
import { PlantAreaService } from '../../services/plantarea.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [PlantAreaComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditPlantAreaModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [PlantAreaService],
  exports: [PlantAreaComponent],
})
export class ListPlantAreaModule {}

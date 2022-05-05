import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantComponent } from './list-plant.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditPlantModule } from 'src/app/features/masterdata/general/plant/components/create-edit/ce-plant.module';
import { PlantService } from '../../services/plant.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PlantComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditPlantModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [PlantService],
  exports: [PlantComponent],
})
export class ListPlantModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapTypeComponent } from './list-captype.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCapTypeModule } from 'src/app/features/masterdata/production/captype/components/create-edit/ce-captype.module';
import { CapTypeService } from '../../services/captype.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [CapTypeComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCapTypeModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
  ],
  providers: [CapTypeService],
  exports: [CapTypeComponent],
})
export class ListCapTypeModule {}

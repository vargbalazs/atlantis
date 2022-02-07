import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvkDetailsComponent } from './details.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CapTypeService } from 'src/app/features/masterdata/production/captype/services/captype.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProvkService } from '../../services/provk.service';
import { CapTypeGridModule } from '../captype-grid/captype-grid.module';
import { SalesDetailsModule } from '../salesdetails/salesdetails.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { ToolbarTextModule } from 'src/app/shared/components/toolbartext/toolbartext.module';

@NgModule({
  declarations: [ProvkDetailsComponent],
  imports: [
    CommonModule,
    ToolBarModule,
    LoadingOverlayModule,
    DialogModule,
    IconsModule,
    LayoutModule,
    GridModule,
    CapTypeGridModule,
    SalesDetailsModule,
    ButtonsModule,
    ConfirmDialogStyleModule,
    ToolbarTextModule,
  ],
  providers: [CapTypeService, ProvkService],
  exports: [ProvkDetailsComponent],
})
export class ProvkDetailsModule {}

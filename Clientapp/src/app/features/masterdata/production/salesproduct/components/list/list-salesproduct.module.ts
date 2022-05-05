import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesProductComponent } from './list-salesproduct.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditSalesProductModule } from 'src/app/features/masterdata/production/salesproduct/components/create-edit/ce-salesproduct.module';
import { SalesProductService } from '../../services/salesproduct.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CopyModule } from '../../../../../../shared/components/copy-entity/copy.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SalesProductComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditSalesProductModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [SalesProductService],
  exports: [SalesProductComponent],
})
export class ListSalesProductModule {}

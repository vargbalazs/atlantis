import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostAccountComponent } from './list-costaccount.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCostAccountModule } from 'src/app/features/masterdata/planning/costaccount/components/create-edit/ce-costaccount.module';
import { CostAccountService } from '../../services/costaccount.service';
import { CopyModule } from 'src/app/shared/components/copy-entity/copy.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CopyService } from '../../services/copy.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CostAccountComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCostAccountModule,
    LoadingOverlayModule,
    CopyModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [CostAccountService, CopyService],
  exports: [CostAccountComponent],
})
export class ListCostAccountModule {}

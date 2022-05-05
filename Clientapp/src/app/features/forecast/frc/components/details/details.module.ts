import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrcDetailsComponent } from './details.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { FrcService } from '../../services/frc.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { ToolbarTextModule } from 'src/app/shared/components/toolbartext/toolbartext.module';
import { CapacityModule } from '../capacity/capacity.module';
import { SalesProductModule } from '../salesproduct/salesproduct.module';
import { OtherCostsModule } from '../othercosts/othercosts.module';
import { HcModule } from '../hc/hc.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FrcDetailsComponent],
  imports: [
    CommonModule,
    ToolBarModule,
    LoadingOverlayModule,
    DialogModule,
    IconsModule,
    LayoutModule,
    GridModule,
    ButtonsModule,
    ConfirmDialogStyleModule,
    ToolbarTextModule,
    CapacityModule,
    SalesProductModule,
    OtherCostsModule,
    HcModule,
    TranslateModule,
  ],
  providers: [FrcService],
  exports: [FrcDetailsComponent],
})
export class FrcDetailsModule {}

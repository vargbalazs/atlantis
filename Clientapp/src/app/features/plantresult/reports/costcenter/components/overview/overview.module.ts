import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterOverviewComponent } from './overview.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { CondFormatModule } from 'src/app/shared/components/cond-format/cond-format.module';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CostCenterOverviewComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    LoadingOverlayModule,
    FilterModule,
    ExcelModule,
    ConfirmDialogStyleModule,
    CondFormatModule,
    NavigationModule,
    RouterModule,
    TranslateModule,
  ],
  providers: [],
  exports: [CostCenterOverviewComponent],
})
export class CostCenterOverviewModule {}

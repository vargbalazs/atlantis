import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterDetailsComponent } from './details.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CondFormatModule } from 'src/app/shared/components/cond-format/cond-format.module';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ReportService } from 'src/app/shared/services/report.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CostCenterDetailsComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    ButtonsModule,
    LoadingOverlayModule,
    ExcelModule,
    CondFormatModule,
    NavigationModule,
    RouterModule,
  ],
  providers: [],
  exports: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}

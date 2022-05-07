import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantPlOverviewComponent } from './plantpl.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CondFormatModule } from 'src/app/shared/components/cond-format/cond-format.module';
import { RouterModule } from '@angular/router';
import { ReportService } from 'src/app/shared/services/report.service';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PlantPlOverviewComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    LoadingOverlayModule,
    FilterModule,
    ExcelModule,
    CondFormatModule,
    RouterModule,
    TooltipModule,
    TranslateModule,
  ],
  providers: [ReportService],
  exports: [PlantPlOverviewComponent],
})
export class PlantPlOverviewModule {}

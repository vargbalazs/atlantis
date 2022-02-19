import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostUploadModule } from './uploadcost/costupload.module';
import { ReportModule } from './reports/report.module';
import { BrowseModule } from './browsedata/browsedata.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CostUploadModule, ReportModule, BrowseModule],
  providers: [],
  exports: [],
})
export class PlantResultModule {}

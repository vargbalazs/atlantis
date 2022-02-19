import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseDataComponent } from './list.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';

@NgModule({
  declarations: [BrowseDataComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    LoadingOverlayModule,
    FilterModule,
    ExcelModule,
    NavigationModule,
  ],
  providers: [],
  exports: [BrowseDataComponent],
})
export class BrowseDataModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapUnitComponent } from './list-capunit.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCapUnitModule } from 'src/app/features/masterdata/production/capunit/components/create-edit/ce-capunit.module';
import { CapUnitService } from '../../services/capunit.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CapUnitComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCapUnitModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [CapUnitService],
  exports: [CapUnitComponent],
})
export class ListCapUnitModule {}

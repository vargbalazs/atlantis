import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationDetailsComponent } from './allocation-details.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { PopupAnchorModule } from 'src/app/shared/directives/popup.anchor-target.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [AllocationDetailsComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    GridModule,
    IconsModule,
    DropDownsModule,
    ReactiveFormsModule,
    PopupModule,
    InputsModule,
    LoadingOverlayModule,
    PopupAnchorModule,
    ConfirmDialogStyleModule,
  ],
  providers: [],
  exports: [AllocationDetailsComponent],
})
export class AllocationDetailsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityComponent } from './capacity.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FrcService } from '../../services/frc.service';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupAnchorModule } from 'src/app/shared/directives/popup.anchor-target.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';

@NgModule({
  declarations: [CapacityComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    FilterModule,
    PopupModule,
    InputsModule,
    PopupAnchorModule,
    LoadingOverlayModule,
  ],
  providers: [FrcService],
  exports: [CapacityComponent],
})
export class CapacityModule {}

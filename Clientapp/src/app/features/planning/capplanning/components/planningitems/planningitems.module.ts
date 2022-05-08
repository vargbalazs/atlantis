import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapPlanningItemsComponent } from './planningitems.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CapPlanningService } from '../../services/capplanning.service';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupAnchorModule } from 'src/app/shared/directives/popup-anchor/popup.anchor-target.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CapPlanningItemsComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    LoadingOverlayModule,
    ReactiveFormsModule,
    FilterModule,
    PopupModule,
    InputsModule,
    PopupAnchorModule,
    TranslateModule,
  ],
  providers: [CapPlanningService],
  exports: [CapPlanningItemsComponent],
})
export class ListCapPlanningItemsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapTypeGridComponent } from './captype-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PopupAnchorModule } from 'src/app/shared/directives/popup.anchor-target.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ProvkService } from '../../services/provk.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CapTypeGridComponent],
  imports: [
    CommonModule,
    GridModule,
    ButtonsModule,
    ReactiveFormsModule,
    PopupModule,
    PopupAnchorModule,
    InputsModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [ProvkService],
  exports: [CapTypeGridComponent],
})
export class CapTypeGridModule {}

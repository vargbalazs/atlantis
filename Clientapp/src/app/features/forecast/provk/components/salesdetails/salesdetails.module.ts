import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDetailsComponent } from './salesdetails.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProvkService } from '../../services/provk.service';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupAnchorModule } from 'src/app/shared/directives/popup.anchor-target.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SalesDetailsComponent],
  imports: [
    CommonModule,
    GridModule,
    ButtonsModule,
    PopupModule,
    InputsModule,
    ReactiveFormsModule,
    PopupAnchorModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [ProvkService],
  exports: [SalesDetailsComponent],
})
export class SalesDetailsModule {}

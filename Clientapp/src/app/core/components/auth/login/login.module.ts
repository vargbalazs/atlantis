import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LangSelectorModule } from '../langselector/langselector.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    InputsModule,
    CommonModule,
    IconsModule,
    ButtonsModule,
    LayoutModule,
    LabelModule,
    LangSelectorModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
  ],
  providers: [],
  exports: [LoginComponent],
})
export class LoginModule {}

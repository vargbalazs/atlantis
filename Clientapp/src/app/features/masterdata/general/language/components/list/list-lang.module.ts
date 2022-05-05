import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './list-lang.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditLanguageModule } from 'src/app/features/masterdata/general/language/components/create-edit/ce-lang.module';
import { LanguageService } from '../../services/language.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditLanguageModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [LanguageService],
  exports: [LanguageComponent],
})
export class ListLanguageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrcComponent } from './list-frc.component';
import { FrcService } from '../../services/frc.service';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FrcCardModule } from '../card/card.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { CreateEditFrcModule } from '../create-edit/ce-frc.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FrcComponent],
  imports: [
    CommonModule,
    ToolBarModule,
    FilterModule,
    LoadingOverlayModule,
    ButtonsModule,
    IconsModule,
    DialogModule,
    FrcCardModule,
    CreateEditFrcModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [FrcService],
  exports: [FrcComponent],
})
export class ListFrcModule {}

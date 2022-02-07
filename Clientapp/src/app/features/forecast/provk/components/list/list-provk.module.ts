import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvkComponent } from './list-provk.component';
import { ProvkService } from '../../services/provk.service';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ProvkCardModule } from '../card/card.module';
import { VersionSelectorModule } from '../version-selector/ver-sel.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { CreateEditProvkModule } from '../create-edit/ce-provk.module';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';

@NgModule({
  declarations: [ProvkComponent],
  imports: [
    CommonModule,
    ToolBarModule,
    FilterModule,
    LoadingOverlayModule,
    ButtonsModule,
    IconsModule,
    DialogModule,
    ProvkCardModule,
    VersionSelectorModule,
    CreateEditProvkModule,
    ConfirmDialogStyleModule,
  ],
  providers: [ProvkService],
  exports: [ProvkComponent],
})
export class ListProvkModule {}

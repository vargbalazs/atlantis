import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapGroupComponent } from './list-capgroup.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCapGroupModule } from 'src/app/features/masterdata/production/capgroup/components/create-edit/ce-capgroup.module';
import { CapGroupService } from '../../services/capgroup.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CopyModule } from '../../../../../../shared/components/copy-entity/copy.module';
import { CopyService } from '../../services/copy.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CapGroupComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    ButtonsModule,
    CreateEditCapGroupModule,
    CopyModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [CapGroupService, CopyService],
  exports: [CapGroupComponent],
})
export class ListCapGroupModule {}

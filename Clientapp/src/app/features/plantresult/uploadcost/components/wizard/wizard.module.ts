import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EntityModule } from '../entity/entity.module';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FileModule } from '../file/file.module';
import { OverviewModule } from '../overview/overview.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [WizardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    EntityModule,
    DialogsModule,
    FileModule,
    OverviewModule,
    UploadFileModule,
    LoadingOverlayModule,
    TranslateModule,
  ],
  providers: [],
  exports: [WizardComponent],
})
export class WizardModule {}

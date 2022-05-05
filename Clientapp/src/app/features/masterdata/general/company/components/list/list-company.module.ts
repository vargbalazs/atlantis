import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './list-company.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CreateEditCompanyModule } from 'src/app/features/masterdata/general/company/components/create-edit/ce-company.module';
import { CompanyService } from '../../services/company.service';
import { ConfirmDialogStyleModule } from 'src/app/shared/directives/confirmdialog/confirmdialog-style.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    DialogModule,
    CreateEditCompanyModule,
    LoadingOverlayModule,
    ConfirmDialogStyleModule,
    TranslateModule,
  ],
  providers: [CompanyService],
  exports: [CompanyComponent],
})
export class ListCompanyModule {}

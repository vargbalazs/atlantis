import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionSelectorComponent } from './ver-sel.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [VersionSelectorComponent],
  imports: [CommonModule, LayoutModule, DialogModule, TranslateModule],
  providers: [],
  exports: [VersionSelectorComponent],
})
export class VersionSelectorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSelectorComponent } from './langselector.component';

@NgModule({
  declarations: [LangSelectorComponent],
  imports: [CommonModule],
  providers: [],
  exports: [LangSelectorComponent],
})
export class LangSelectorModule {}

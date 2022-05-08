import { NgModule } from '@angular/core';
import { PopupAnchorDirective } from './popup.anchor-target.directive';

@NgModule({
  declarations: [PopupAnchorDirective],

  exports: [PopupAnchorDirective],
})
export class PopupAnchorModule {}

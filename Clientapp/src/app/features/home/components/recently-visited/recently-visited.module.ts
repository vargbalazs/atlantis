import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyVisitedComponent } from './recently-visited.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [RecentlyVisitedComponent],
  imports: [CommonModule, LayoutModule],
  providers: [],
  exports: [RecentlyVisitedComponent],
})
export class RecentlyVisitedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartLayoutComponent } from './start-layout.component';
import { AppBarModule } from '../appbar/appbar.module';
import { SideBarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [StartLayoutComponent],
  imports: [CommonModule, AppBarModule, SideBarModule],
  providers: [],
  exports: [StartLayoutComponent],
})
export class StartLayoutModule {}

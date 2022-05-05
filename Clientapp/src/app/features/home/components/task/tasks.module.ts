import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, LayoutModule, TranslateModule],
  providers: [],
  exports: [TasksComponent],
})
export class TasksModule {}

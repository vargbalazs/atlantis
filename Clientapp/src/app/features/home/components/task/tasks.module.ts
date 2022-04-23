import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, LayoutModule],
  providers: [],
  exports: [TasksComponent],
})
export class TasksModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './base.component';
import { QuickAccessModule } from '../quick-access/quick-access.module';
import { TasksModule } from '../task/tasks.module';
import { RecentlyVisitedModule } from '../recently-visited/recently-visited.module';
import { HomeService } from '../../services/home.service';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    QuickAccessModule,
    TasksModule,
    RecentlyVisitedModule,
    LoadingOverlayModule,
  ],
  providers: [HomeService],
  exports: [HomeComponent],
})
export class BaseModule {}

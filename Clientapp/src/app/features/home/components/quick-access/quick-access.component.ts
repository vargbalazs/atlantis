import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ModuleInterface } from '../../interfaces/module.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.css'],
})
export class QuickAccessComponent {
  sidebarItemClickedSub!: Subscription;
  modules: ModuleInterface[] = [
    {
      name: this.translateService.instant('sidebar.costPlanning'),
      routePath: 'planning/costplanning',
      hovered: false,
      icon: 'calculator',
      translateId: 'sidebar.costPlanning',
    },
    {
      name: this.translateService.instant('sidebar.hcPlanning'),
      routePath: 'planning/hcplanning',
      hovered: false,
      icon: 'inherited',
      translateId: 'sidebar.hcPlanning',
    },
    {
      name: this.translateService.instant('sidebar.plantPl'),
      routePath: 'plantresult/plantpl',
      hovered: false,
      icon: 'currency',
      translateId: 'sidebar.plantPl',
    },
    {
      name: this.translateService.instant('sidebar.costOverview'),
      routePath: 'plantresult/costcenter',
      hovered: false,
      icon: 'chart-column-clustered',
      translateId: 'sidebar.costOverview',
    },
    {
      name: this.translateService.instant('sidebar.forecast'),
      routePath: 'forecast/frc',
      hovered: false,
      icon: 'graph',
      translateId: 'sidebar.forecast',
    },
  ];

  constructor(
    private homeService: HomeService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  cardOverOut(module: ModuleInterface) {
    module.hovered = !module.hovered;
  }

  cardClick(module: ModuleInterface) {
    this.router.navigate([module.routePath], { skipLocationChange: true });
    const item = { ...module };
    item.date = new Date();
    item.icon = 'calendar';
    item.hovered = false;
    this.homeService.registerModule.next(item);
  }
}

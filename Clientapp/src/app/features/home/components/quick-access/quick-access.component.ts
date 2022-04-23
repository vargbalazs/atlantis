import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      name: 'Költségtervezés',
      routePath: 'planning/costplanning',
      hovered: false,
      icon: 'calculator',
    },
    {
      name: 'Létszámtervezés',
      routePath: 'planning/hcplanning',
      hovered: false,
      icon: 'inherited',
    },
    {
      name: 'Gyári eredménykimutatás',
      routePath: 'plantresult/plantpl',
      hovered: false,
      icon: 'currency',
    },
    {
      name: 'Költséghelyi áttekintő',
      routePath: 'plantresult/costcenter',
      hovered: false,
      icon: 'chart-column-clustered',
    },
    {
      name: 'Forecast',
      routePath: 'forecast/frc',
      hovered: false,
      icon: 'graph',
    },
  ];

  constructor(private homeService: HomeService, private router: Router) {}

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

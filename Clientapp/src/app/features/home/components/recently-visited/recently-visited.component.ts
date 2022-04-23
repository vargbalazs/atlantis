import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModuleInterface } from '../../interfaces/module.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'recently-visited',
  templateUrl: './recently-visited.component.html',
  styleUrls: ['./recently-visited.component.css'],
})
export class RecentlyVisitedComponent implements OnInit, OnDestroy {
  registerModuleSub!: Subscription;
  modules: ModuleInterface[] = [];

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.registerModuleSub = this.homeService.registerModule.subscribe(
      (module) => {
        this.homeService.registerRecentlyVisitedModule(this.modules, module);
      }
    );
    this.modules = this.homeService.getVisitedItemsFromLocalStorage();
  }

  ngOnDestroy() {
    this.registerModuleSub.unsubscribe();
  }

  cardOverOut(module: ModuleInterface) {
    module.hovered = !module.hovered;
  }

  cardClick(module: ModuleInterface) {
    this.router.navigate([module.routePath], { skipLocationChange: true });
    this.modules.find((item) => item.routePath === module.routePath)!.date =
      new Date();
  }
}

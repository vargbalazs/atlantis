import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleInterface } from '../interfaces/module.interface';
import { TaskInterface } from '../interfaces/task.interface';

@Injectable()
export class HomeService {
  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) {}

  registerRecentlyVisitedModule(
    visitedItems: ModuleInterface[],
    module: ModuleInterface
  ) {
    if (visitedItems.some((item) => item.routePath === module.routePath)) {
      visitedItems.find((item) => item.routePath === module.routePath)!.date =
        module.date;
      visitedItems.find((item) => item.routePath === module.routePath)!.name =
        this.translateService.instant(module.translateId!);
      this.saveVisitedItemsToLocalStorage(visitedItems);
      return;
    }
    if (visitedItems.length === 5) visitedItems.pop();
    visitedItems.push(module);
    this.saveVisitedItemsToLocalStorage(visitedItems);
  }

  registerModule = new Subject<ModuleInterface>();

  saveVisitedItemsToLocalStorage(visitedItems: ModuleInterface[]) {
    localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
  }

  getVisitedItemsFromLocalStorage(): ModuleInterface[] {
    const visitedItems = <ModuleInterface[]>(
      JSON.parse(localStorage.getItem('visitedItems')!)
    );
    visitedItems.forEach(
      (item) => (item.name = this.translateService.instant(item.translateId!))
    );
    return visitedItems ? visitedItems : [];
  }

  getTasks() {
    return this.http.get<TaskInterface[]>(
      `${environment.apiUrl}/api/planning/task/all`
    );
  }
}

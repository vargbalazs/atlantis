import { Injectable } from '@angular/core';
import { HcPlanningItem } from '../models/hcplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostAssign } from '../models/costassign.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class HcPlanningService implements IRepository<HcPlanningItem> {
  constructor(private http: HttpClient) {}

  add(planningItem: HcPlanningItem) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/planning/hcplanning`,
      planningItem
    );
  }

  update(planningItem: HcPlanningItem) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/planning/hcplanning`,
      planningItem
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/planning/hcplanning/${id}`
    );
  }

  getItems(costCenterId: number, costAccTypeId: number) {
    let filterCrit = {
      costCenterId: costCenterId,
      costAccTypeId: costAccTypeId,
    };
    return this.http.get<HcPlanningItem[]>(
      `${environment.apiUrl}/api/planning/hcplanning/items`,
      { params: filterCrit }
    );
  }

  saveCostAssigns(costAssign: CostAssign[], planningItemId: number) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/planning/hcplanning/costassign/${planningItemId}`,
      costAssign
    );
  }

  getCostAssigns(planningItemId: number) {
    return this.http.get<CostAssign[]>(
      `${environment.apiUrl}/api/planning/hcplanning/costassign/${planningItemId}`
    );
  }
}

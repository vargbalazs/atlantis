import { Injectable } from '@angular/core';
import { HcPlanningItem } from '../models/hcplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostAssign } from '../models/costassign.model';

@Injectable()
export class HcPlanningService implements IRepository<HcPlanningItem> {
  constructor(private http: HttpClient) {}

  add(planningItem: HcPlanningItem) {
    return this.http.post<number>('/api/planning/hcplanning', planningItem);
  }

  update(planningItem: HcPlanningItem) {
    return this.http.patch<number>('/api/planning/hcplanning', planningItem);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/planning/hcplanning/${id}`);
  }

  saveCostAssigns(costAssign: CostAssign[]) {
    return this.http.post<number>(
      '/api/planning/hcplanning/costassign',
      costAssign
    );
  }

  getCostAssigns(planningItemId: number) {
    return this.http.get<CostAssign[]>(
      `/api/planning/hcplanning/${planningItemId}`
    );
  }
}

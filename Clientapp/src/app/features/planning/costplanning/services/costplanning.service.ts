import { Injectable } from '@angular/core';
import { CostPlanningItem } from '../models/costplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostPlanningService implements IRepository<CostPlanningItem> {
  constructor(private http: HttpClient) {}

  add(planningItem: CostPlanningItem) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/planning/costplanning`,
      planningItem
    );
  }

  update(planningItem: CostPlanningItem) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/planning/costplanning`,
      planningItem
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/planning/costplanning/${id}`
    );
  }

  checkSum(planningItem: CostPlanningItem) {
    return this.http.post<boolean>(
      `${environment.apiUrl}/api/planning/costplanning/checksum`,
      planningItem
    );
  }

  getItems(costCenterId: number, costAccTypeId: number) {
    let filterCrit = {
      costCenterId: costCenterId,
      costAccTypeId: costAccTypeId,
    };
    return this.http.get<CostPlanningItem[]>(
      `${environment.apiUrl}/api/planning/costplanning/items`,
      { params: filterCrit }
    );
  }
}

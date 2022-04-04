import { Injectable } from '@angular/core';
import { CapPlanningItem } from '../models/capplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CapPlanningService implements IRepository<CapPlanningItem> {
  constructor(private http: HttpClient) {}

  getCapPlanningItems(
    companyId: number,
    plantId: number,
    year: number,
    costAccTypeId: number
  ) {
    let filterCrit = {
      companyId: companyId,
      plantId: plantId,
      year: year,
      costAccTypeId: costAccTypeId,
    };
    return this.http.get<CapPlanningItem[]>(
      `${environment.apiUrl}/api/planning/capplanning`,
      { params: filterCrit }
    );
  }

  update(planningItem: CapPlanningItem) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/planning/capplanning`,
      planningItem
    );
  }
}

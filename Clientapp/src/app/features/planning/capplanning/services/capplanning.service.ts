import { Injectable } from '@angular/core';
import { CapPlanningItem } from '../models/capplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CapPlanningService implements IRepository<CapPlanningItem> {
  constructor(private http: HttpClient) {}

  add(planningItem: CapPlanningItem) {
    return this.http.post<number>('/api/planning/capplanning', planningItem);
  }

  update(planningItem: CapPlanningItem) {
    return this.http.patch<number>('/api/planning/capplanning', planningItem);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/planning/capplanning/${id}`);
  }
}

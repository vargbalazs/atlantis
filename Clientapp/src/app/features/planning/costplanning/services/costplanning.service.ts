import { Injectable } from '@angular/core';
import { CostPlanningItem } from '../models/costplanningitem.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostPlanningService implements IRepository<CostPlanningItem> {
  constructor(private http: HttpClient) {}

  add(planningItem: CostPlanningItem) {
    return this.http.post<number>('/api/planning/costplanning', planningItem);
  }

  update(planningItem: CostPlanningItem) {
    return this.http.patch<number>('/api/planning/costplanning', planningItem);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/planning/costplanning/${id}`);
  }

  checkSum(planningItem: CostPlanningItem) {
    return this.http.post<boolean>(
      '/api/planning/costplanning/checksum',
      planningItem
    );
  }
}

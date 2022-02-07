import { Injectable } from '@angular/core';
import { CostGroup } from '../models/costgroup.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostGroupService implements IRepository<CostGroup> {
  constructor(private http: HttpClient) {}

  add(costgroup: CostGroup) {
    return this.http.post<number>(
      '/api/masterdata/planning/costgroup',
      costgroup
    );
  }

  update(costgroup: CostGroup) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costgroup',
      costgroup
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/planning/costgroup/${id}`);
  }
}

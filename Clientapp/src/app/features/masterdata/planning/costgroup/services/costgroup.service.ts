import { Injectable } from '@angular/core';
import { CostGroup } from '../models/costgroup.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostGroupService implements IRepository<CostGroup> {
  constructor(private http: HttpClient) {}

  add(costgroup: CostGroup) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costgroup`,
      costgroup
    );
  }

  update(costgroup: CostGroup) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costgroup`,
      costgroup
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costgroup/${id}`
    );
  }

  getCostGroups(companyId?: number) {
    if (companyId) {
      let filterCrit = { companyId: companyId };
      return this.http.get<CostGroup[]>(
        `${environment.apiUrl}/api/masterdata/planning/costgroup/filter`,
        { params: filterCrit }
      );
    } else {
      return this.http.get<CostGroup[]>(
        `${environment.apiUrl}/api/masterdata/planning/costgroup`
      );
    }
  }
}

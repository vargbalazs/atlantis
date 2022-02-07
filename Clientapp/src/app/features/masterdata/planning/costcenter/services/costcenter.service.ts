import { Injectable } from '@angular/core';
import { CostCenter } from '../models/costcenter.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostCenterService implements IRepository<CostCenter> {
  constructor(private http: HttpClient) {}

  add(costcenter: CostCenter) {
    return this.http.post<number>(
      '/api/masterdata/planning/costcenter',
      costcenter
    );
  }

  update(costcenter: CostCenter) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costcenter',
      costcenter
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `/api/masterdata/planning/costcenter/${id}`
    );
  }
}

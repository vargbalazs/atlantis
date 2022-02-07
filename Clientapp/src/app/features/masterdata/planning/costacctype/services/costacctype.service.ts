import { Injectable } from '@angular/core';
import { CostAccountingType } from '../models/costacctype.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostAccountingTypeService
  implements IRepository<CostAccountingType>
{
  constructor(private http: HttpClient) {}

  add(costAccType: CostAccountingType) {
    return this.http.post<number>(
      '/api/masterdata/planning/costAccType',
      costAccType
    );
  }

  update(costAccType: CostAccountingType) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costAccType',
      costAccType
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `/api/masterdata/planning/costAccType/${id}`
    );
  }
}

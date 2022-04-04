import { Injectable } from '@angular/core';
import { CostAccountingType } from '../models/costacctype.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostAccountingTypeService
  implements IRepository<CostAccountingType>
{
  constructor(private http: HttpClient) {}

  add(costAccType: CostAccountingType) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costacctype`,
      costAccType
    );
  }

  update(costAccType: CostAccountingType) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costacctype`,
      costAccType
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costacctype/${id}`
    );
  }

  getCostAccTypes() {
    return this.http.get<CostAccountingType[]>(
      `${environment.apiUrl}/api/masterdata/planning/costacctype`
    );
  }
}

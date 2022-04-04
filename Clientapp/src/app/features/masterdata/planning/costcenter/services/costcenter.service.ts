import { Injectable } from '@angular/core';
import { CostCenter } from '../models/costcenter.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostCenterService implements IRepository<CostCenter> {
  constructor(private http: HttpClient) {}

  add(costcenter: CostCenter) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costcenter`,
      costcenter
    );
  }

  update(costcenter: CostCenter) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costcenter`,
      costcenter
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costcenter/${id}`
    );
  }

  getCostCenters(plantId?: number, year?: number) {
    if (plantId && year) {
      let filterCrit = { plantId: plantId, year: year };
      return this.http.get<CostCenter[]>(
        `${environment.apiUrl}/api/masterdata/planning/costcenter/filter`,
        { params: filterCrit }
      );
    } else {
      return this.http.get<CostCenter[]>(
        `${environment.apiUrl}/api/masterdata/planning/costcenter`
      );
    }
  }
}

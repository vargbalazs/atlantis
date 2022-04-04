import { Injectable } from '@angular/core';
import { CostResp } from '../models/costresp.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostRespService implements IRepository<CostResp> {
  constructor(private http: HttpClient) {}

  add(costresp: CostResp) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costresp`,
      costresp
    );
  }

  update(costresp: CostResp) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costresp`,
      costresp
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costresp/${id}`
    );
  }

  getCostResps() {
    return this.http.get<CostResp[]>(
      `${environment.apiUrl}/api/masterdata/planning/costresp`
    );
  }
}

import { Injectable } from '@angular/core';
import { CostResp } from '../models/costresp.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostRespService implements IRepository<CostResp> {
  constructor(private http: HttpClient) {}

  add(costresp: CostResp) {
    return this.http.post<number>(
      '/api/masterdata/planning/costresp',
      costresp
    );
  }

  update(costresp: CostResp) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costresp',
      costresp
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/planning/costresp/${id}`);
  }
}

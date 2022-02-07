import { Injectable } from '@angular/core';
import { CostAccount } from '../models/costaccount.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CostAccountService implements IRepository<CostAccount> {
  constructor(private http: HttpClient) {}

  add(costaccount: CostAccount) {
    return this.http.post<number>(
      '/api/masterdata/planning/costaccount',
      costaccount
    );
  }

  update(costaccount: CostAccount) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costaccount',
      costaccount
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `/api/masterdata/planning/costaccount/${id}`
    );
  }
}

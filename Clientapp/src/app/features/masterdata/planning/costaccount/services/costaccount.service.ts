import { Injectable } from '@angular/core';
import { CostAccount } from '../models/costaccount.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostAccountService implements IRepository<CostAccount> {
  constructor(private http: HttpClient) {}

  add(costaccount: CostAccount) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costaccount`,
      costaccount
    );
  }

  update(costaccount: CostAccount) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costaccount`,
      costaccount
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costaccount/${id}`
    );
  }

  getCostAccounts(companyId?: number, year?: number) {
    if (companyId && year) {
      let filterCrit = { companyId: companyId, year: year };
      return this.http.get<CostAccount[]>(
        `${environment.apiUrl}/api/masterdata/planning/costaccount/filter`,
        { params: filterCrit }
      );
    } else {
      return this.http.get<CostAccount[]>(
        `${environment.apiUrl}/api/masterdata/planning/costaccount`
      );
    }
  }
}

import { Injectable } from '@angular/core';
import { ActProdData } from '../models/act-prod-data.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class ActProdDataService implements IRepository<ActProdData> {
  constructor(private http: HttpClient) {}

  update(actProdData: ActProdData) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/production/actualcap`,
      actProdData
    );
  }

  getActualData(companyId: number, plantId: number, year: number) {
    let filterCrit = { companyId: companyId, plantId: plantId, year: year };
    return this.http.get<ActProdData[]>(
      `${environment.apiUrl}/api/production/actualcap`,
      {
        params: filterCrit,
      }
    );
  }
}

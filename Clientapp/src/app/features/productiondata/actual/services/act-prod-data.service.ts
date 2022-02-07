import { Injectable } from '@angular/core';
import { ActProdData } from '../models/act-prod-data.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class ActProdDataService implements IRepository<ActProdData> {
  constructor(private http: HttpClient) {}

  add(actProdData: ActProdData) {
    return this.http.post<number>(
      '/api/productiondata/actproddata',
      actProdData
    );
  }

  update(actProdData: ActProdData) {
    return this.http.patch<number>(
      '/api/productiondata/actproddata',
      actProdData
    );
  }

  getActualData(companyId: number, plantId: number, year: number) {
    let filterCrit = { companyId: companyId, plantId: plantId, year: year };
    return this.http.get<ActProdData[]>('/api/productiondata/actproddata', {
      params: filterCrit,
    });
  }
}

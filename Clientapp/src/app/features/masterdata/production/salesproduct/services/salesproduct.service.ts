import { Injectable } from '@angular/core';
import { SalesProduct } from '../models/salesproduct.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class SalesProductService implements IRepository<SalesProduct> {
  constructor(private http: HttpClient) {}

  add(salesproduct: SalesProduct) {
    return this.http.post<number>(
      '/api/masterdata/production/salesproduct',
      salesproduct
    );
  }

  update(salesproduct: SalesProduct) {
    return this.http.patch<number>(
      '/api/masterdata/production/salesproduct',
      salesproduct
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `/api/masterdata/production/salesproduct/${id}`
    );
  }
}

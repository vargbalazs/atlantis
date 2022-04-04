import { Injectable } from '@angular/core';
import { SalesProduct } from '../models/salesproduct.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class SalesProductService implements IRepository<SalesProduct> {
  constructor(private http: HttpClient) {}

  add(salesproduct: SalesProduct) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/production/salesproduct`,
      salesproduct
    );
  }

  update(salesproduct: SalesProduct) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/production/salesproduct`,
      salesproduct
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/production/salesproduct/${id}`
    );
  }

  getSalesProducts() {
    return this.http.get<SalesProduct[]>(
      `${environment.apiUrl}/api/masterdata/production/salesproduct`
    );
  }
}

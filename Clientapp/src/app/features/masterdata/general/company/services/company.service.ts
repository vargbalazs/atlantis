import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService implements IRepository<Company> {
  constructor(private http: HttpClient) {}

  add(company: Company) {
    return this.http.post<number>('/api/masterdata/general/company', company);
  }

  update(company: Company) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/general/company`,
      company
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/general/company/${id}`);
  }
}

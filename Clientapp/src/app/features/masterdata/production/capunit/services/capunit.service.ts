import { Injectable } from '@angular/core';
import { CapUnit } from '../models/capunit.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CapUnitService implements IRepository<CapUnit> {
  constructor(private http: HttpClient) {}

  add(capunit: CapUnit) {
    return this.http.post<number>(
      '/api/masterdata/production/capunit',
      capunit
    );
  }

  update(capunit: CapUnit) {
    return this.http.patch<number>(
      '/api/masterdata/production/capunit',
      capunit
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/production/capunit/${id}`);
  }
}

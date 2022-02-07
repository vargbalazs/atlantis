import { Injectable } from '@angular/core';
import { CapType } from '../models/captype.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class CapTypeService implements IRepository<CapType> {
  constructor(private http: HttpClient) {}

  add(captype: CapType) {
    return this.http.post<number>(
      '/api/masterdata/production/captype',
      captype
    );
  }

  update(captype: CapType) {
    return this.http.patch<number>(
      '/api/masterdata/production/captype',
      captype
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/production/captype/${id}`);
  }

  getCapTypes(plantId: number) {
    return this.http.get<CapType[]>('/api/masterdata/production/captypes', {
      params: { plantId: plantId },
    });
  }
}

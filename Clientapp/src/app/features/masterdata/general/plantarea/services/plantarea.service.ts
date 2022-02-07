import { Injectable } from '@angular/core';
import { PlantArea } from '../models/plantarea.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class PlantAreaService implements IRepository<PlantArea> {
  constructor(private http: HttpClient) {}

  add(plantarea: PlantArea) {
    return this.http.post<number>(
      '/api/masterdata/general/plantarea',
      plantarea
    );
  }

  update(plantarea: PlantArea) {
    return this.http.patch<number>(
      '/api/masterdata/general/plantarea',
      plantarea
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/general/plantarea/${id}`);
  }
}

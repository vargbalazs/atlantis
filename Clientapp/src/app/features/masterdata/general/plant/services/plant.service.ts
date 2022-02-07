import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class PlantService implements IRepository<Plant> {
  constructor(private http: HttpClient) {}

  add(plant: Plant) {
    return this.http.post<number>('/api/masterdata/general/plant', plant);
  }

  update(plant: Plant) {
    return this.http.patch<number>('/api/masterdata/general/plant', plant);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/general/plant/${id}`);
  }
}

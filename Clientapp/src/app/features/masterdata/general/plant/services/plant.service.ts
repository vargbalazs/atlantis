import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlantService implements IRepository<Plant> {
  constructor(private http: HttpClient) {}

  add(plant: Plant) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/general/plant`,
      plant
    );
  }

  update(plant: Plant) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/general/plant`,
      plant
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/general/plant/${id}`
    );
  }

  getPlants() {
    return this.http.get<Plant[]>(
      `${environment.apiUrl}/api/masterdata/general/plant`
    );
  }
}

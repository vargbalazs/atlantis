import { Injectable } from '@angular/core';
import { PlanningVersion } from '../models/version.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class PlanningVersionService implements IRepository<PlanningVersion> {
  constructor(private http: HttpClient) {}

  add(version: PlanningVersion) {
    return this.http.post<number>('/api/planning/version', version);
  }

  changeStatus(status: number) {
    return this.http.post('/api/planning/version/changestatus', status);
  }
}

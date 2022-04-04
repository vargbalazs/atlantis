import { Injectable } from '@angular/core';
import { PlanningVersion } from '../models/version.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlanningVersionService implements IRepository<PlanningVersion> {
  constructor(private http: HttpClient) {}

  add(version: PlanningVersion) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/planning/version`,
      version
    );
  }

  update(version: PlanningVersion) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/planning/version`,
      version
    );
  }

  getVersions() {
    return this.http.get<PlanningVersion[]>(
      `${environment.apiUrl}/api/planning/version`
    );
  }
}

import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';
import { Department } from '../../department/models/department.model';

@Injectable()
export class JobService implements IRepository<Job> {
  constructor(private http: HttpClient) {}

  add(job: Job) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/general/job`,
      job
    );
  }

  update(job: Job) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/general/job`,
      job
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/general/job/${id}`
    );
  }

  getJobs() {
    return this.http.get<Department[]>(
      `${environment.apiUrl}/api/masterdata/general/job`
    );
  }
}

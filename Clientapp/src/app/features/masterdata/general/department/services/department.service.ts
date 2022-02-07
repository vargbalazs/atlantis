import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class DepartmentService implements IRepository<Department> {
  constructor(private http: HttpClient) {}

  add(department: Department) {
    return this.http.post<number>(
      '/api/masterdata/general/department',
      department
    );
  }

  update(department: Department) {
    return this.http.patch<number>(
      '/api/masterdata/general/department',
      department
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/general/department/${id}`);
  }
}

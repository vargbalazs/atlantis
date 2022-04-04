import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepartmentService implements IRepository<Department> {
  constructor(private http: HttpClient) {}

  add(department: Department) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/general/department`,
      department
    );
  }

  update(department: Department) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/general/department`,
      department
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/general/department/${id}`
    );
  }

  getDepartments(plantId?: number) {
    if (plantId) {
      let filterCrit = { plantId: plantId };
      return this.http.get<Department[]>(
        `${environment.apiUrl}/api/masterdata/general/department/filter`,
        { params: filterCrit }
      );
    } else {
      return this.http.get<Department[]>(
        `${environment.apiUrl}/api/masterdata/general/department`
      );
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { User } from '../models/user.model';
import { CustomHttpResponse } from '../interfaces/custom-http-response.interface';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { Subject } from 'rxjs';

@Injectable()
export class UserService implements IRepository<User> {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.host}/api/user/list`);
  }

  add(user: User) {
    return this.http.post<number>(`${this.host}/api/user/add`, user);
  }

  update(
    user: User,
    httpContextToken?: HttpContextToken<any>,
    tokenValue?: any
  ) {
    return this.http.post<number>(`${this.host}/api/user/update`, user, {
      context: new HttpContext().set(httpContextToken!, tokenValue),
    });
  }

  resetPassword(email: string) {
    return this.http.get<CustomHttpResponse>(
      `${this.host}/api/user/resetpassword/${email}`
    );
  }

  delete(userId: number) {
    return this.http.delete<number>(`${this.host}/api/user/delete/${userId}`);
  }

  addUsersToLocalCache(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersToLocalCache(): User[] | null {
    if (localStorage.getItem('users'))
      return JSON.parse(localStorage.getItem('users')!);
    return null;
  }

  createUserFormData(loggedInUserName: string, user: User): FormData {
    const formData = new FormData();
    formData.append('currentUserName', loggedInUserName);
    formData.append('firstName', user.firstName!);
    formData.append('lastName', user.lastName!);
    formData.append('userName', user.userName!);
    formData.append('email', user.email!);
    formData.append('role', user.role!);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

  profielUpdated = new Subject();

  updateProfileToken = new HttpContextToken(() => false);
}

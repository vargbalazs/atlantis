import { Injectable } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpResponse,
} from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChangePwdModel } from '../models/change-pwd.model';

@Injectable()
export class AuthService {
  private host = environment.apiUrl;
  private token!: string;
  private loggedInUserName!: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private customNotificationService: CustomNotificationService
  ) {}

  togglePass(textBox: TextBoxComponent) {
    const inputEl = textBox.input.nativeElement;

    if (inputEl.type === 'password') {
      inputEl.type = 'text';
    } else {
      inputEl.type = 'password';
    }
  }

  login(user: User) {
    return this.http.post<User>(`${this.host}/api/user/login`, user, {
      observe: 'response',
    });
  }

  register(user: User) {
    return this.http.post<User>(`${this.host}/api/user/signup`, user);
  }

  logout() {
    this.token = null!;
    this.loggedInUserName = null!;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    localStorage.removeItem('rememberMe');
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalCache(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  loadToken() {
    this.token = localStorage.getItem('token')!;
  }

  getToken(): string {
    return this.token;
  }

  isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token) {
      const subject = this.jwtHelper.decodeToken(this.token).sub;
      const tokenExpired = this.jwtHelper.isTokenExpired(this.token);
      if (subject && !tokenExpired) {
        this.loggedInUserName = subject;
        return true;
      }
    } else {
      this.logout();
      return false;
    }
    return false;
  }

  rememberMe() {
    localStorage.setItem('rememberMe', 'true');
  }

  isRememberMeActive(): boolean {
    return localStorage.getItem('rememberMe') ? true : false;
  }

  forgotPassword(email: string) {
    return this.http.get(`${this.host}/api/user/forgotpassword/${email}`);
  }

  userNameExists(userName: string) {
    return this.http.get<boolean>(
      `${this.host}/api/user/usernameexists/${userName}`,
      { context: new HttpContext().set(this.checkUserNameOrEmailToken, true) }
    );
  }

  emailExists(email: string) {
    return this.http.get<boolean>(
      `${this.host}/api/user/useremailexists/${email}`,
      { context: new HttpContext().set(this.checkUserNameOrEmailToken, true) }
    );
  }

  changePassword(user: ChangePwdModel) {
    return this.http.post(`${this.host}/api/user/changepassword`, user);
  }

  setFirstLogin(userName: string) {
    return this.http.post(`${this.host}/api/user/firstlogin/${userName}`, null);
  }

  checkUserNameOrEmailToken = new HttpContextToken(() => false);

  // subscription to pass the username from the first-login component to the changepwd component
  changePwdSub = new Subject<string>();

  // subscription to pass the usernam from the login component to the changepwd component (we can't use the above subscr)
  loginSub = new BehaviorSubject<string>('');
}

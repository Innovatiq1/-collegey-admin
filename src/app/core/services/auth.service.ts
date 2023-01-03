import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/general.response';
import { map } from 'rxjs/operators';
import { Logger } from 'src/app/core/services/logger.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Users } from '../models/user.model';

const Logging = new Logger('AuthService');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  defaultUrl = environment['apiUrl'];
  constructor(private http: HttpClient) {}

  loginUser(email, password,logintype,type): Observable<Users> {
    const body = {
      email,
      password,
      logintype,
      type
    };

    const loginUrl = this.defaultUrl + 'auth/login';
    let headers = new HttpHeaders();
    headers = headers.set('no-auth' , 'true');
    return this.http.post<ApiResponse>(loginUrl, body, { headers }).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getAccessToken() {
    const user = this.getUserInfo();
    return user ? user.token : null;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem(AppConstants.KEY_USER_DATA));
  }

  saveUserInfo(info) {
    localStorage.setItem(AppConstants.KEY_USER_DATA, JSON.stringify(info));
}
}

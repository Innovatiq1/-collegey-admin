import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';
import { Observable,throwError} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';
import { catchError } from 'rxjs/operators';

const Logging = new Logger('UserService');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getUserList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }
  
  
  getUserRewards = (filter:any,userID): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/fetchUserRewards/'+userID;
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getRewardRedeemSetting = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/fetchRewardRedeemSetting';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  createRedeemSettingData = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addRedeemSettingData';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateRedeemSettingData = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateRedeemSettingData';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getUsersByName(data: any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/getUsersByName';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  saveUsers(formData): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateUsers(formData, id): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

}

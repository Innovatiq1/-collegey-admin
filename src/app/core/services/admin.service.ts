import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';

const Logging = new Logger('AdminService');

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getAdminList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=admin';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }


  saveAdmin(formData): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/admin';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateAdmin(formData, id): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getUsersByName(data: any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/getUsersByName2';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }


}

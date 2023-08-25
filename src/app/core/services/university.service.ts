import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';
import { University } from '../models/university.model';

const Logging = new Logger('UniversityService');

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getUniversityList(filter): Observable<Mentor> {   
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=university';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response.data.data));
  }
  getUniversityLists = (filter: any): Observable<any> => {
    const endpoint = environment.apiUrl + 'admin/university/universityList';
    return this.http.get(endpoint, { params: filter }).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };


  saveUniversity(formData): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
  CreateUniversity(formData): Observable<University> {
    const apiUrl = this.defaultUrl + 'admin/university/addUniversity';  
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
  EditUniversity = (data: any, Id: any): Observable<any> => {
    const apiUrl = `${this.defaultUrl}admin/university/${Id}`;

    return this.http.put(apiUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };



  updateUniversity(formData, id): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
  deleteUniversity(id): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/university/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }
  getUniversityById(id): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/university/${id}`;
    return this.http.get(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };

}

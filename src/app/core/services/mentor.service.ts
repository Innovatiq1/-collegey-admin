import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  catchError,map } from 'rxjs/operators';
import { Observable,throwError} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';

const Logging = new Logger('MentorService');

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getMentorList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=mentor';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }
 
  getCurrentMentorDataFetch = (data:any): Observable<any> => {
    const endpoint = environment.apiNewEndpoint+'forget/profile/getMentorUserDataFetch';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getMentors(): Observable<Mentor> {
    
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/mentors';
    return this.http
      .get<ApiResponse>(apiUrl)
      .pipe(map((response) => response.data));
  }

  getMentorsByStatus(data): Observable<any> {    
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/mentorsByStatus';
    return this.http
      .post<ApiResponse>(apiUrl, data)
      .pipe(map((response) => response));
  }


  saveMentor(formData): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateMentor(formData, id): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

}

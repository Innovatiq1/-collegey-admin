import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Webinar } from '../models/webinar.model';
import { ApiResponse } from '../models/general.response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('WebinarService');


@Injectable({
  providedIn: 'root'
})
export class WebinarService {

  constructor(private http: HttpClient) { }
  
  getWebinarList(filter): Observable<Webinar> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/webinars`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getWebinarDetails(id): Observable<Webinar> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/webinars/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  deleteWebinar(id): Observable<Webinar> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/webinars/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  saveWebinar(formData): Observable<Webinar> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/webinars`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  updateWebinar(data: FormData, wid): Observable<Webinar> {
    return this.http.put<ApiResponse>(`${environment.apiUrl}admin/webinars/${wid}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conference } from '../models/conference.model';
import { ApiResponse } from '../models/general.response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('ConferenceService');


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(private http: HttpClient) { }
  
  getConferenceList(filter): Observable<Conference> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/conferences`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getConferenceDetails(id): Observable<Conference> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/conferences/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  saveConference(formData): Observable<Conference> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/conferences`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  updateConference(data: FormData, con): Observable<Conference> {
    return this.http.put<ApiResponse>(`${environment.apiUrl}admin/conferences/${con}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
}
}

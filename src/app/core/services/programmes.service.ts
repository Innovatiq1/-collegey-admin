import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programme } from '../models/programmes.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/general.response';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('ProgrammesService');


@Injectable({
  providedIn: 'root'
})
export class ProgrammesService {

  constructor(private http: HttpClient) { }
  
  getProgrammesList(filter): Observable<Programme> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/programs`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }
  
  getProgramByName(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + 'admin/programs/getProgramByName';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }
  
  getProgramDetails(id): Observable<Programme> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/programs/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }
  deleteProgram(id): Observable<Programme> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/programs/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  saveProgrammes(formData): Observable<Programme> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/programs`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  updatePrograms(data: FormData, pid): Observable<Programme> {
    return this.http.put<ApiResponse>(`${environment.apiUrl}admin/programs/${pid}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
}
}

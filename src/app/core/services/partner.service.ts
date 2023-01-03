import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';

const Logging = new Logger('PartnerService');

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getPartnerList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=partner';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }


  savePartner(formData): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updatePartner(formData, id): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

}

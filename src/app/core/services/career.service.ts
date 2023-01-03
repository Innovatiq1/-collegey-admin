import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { Career, CareerListing } from '../models/career.model';

const Logging = new Logger('careerService');


@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getCareerList(filter): Observable<CareerListing> {
    const apiUrl = this.defaultUrl + 'admin/career/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  
  getCareerInfo(careerId): Observable<Career> {
    const apiUrl = `${this.defaultUrl}admin/career/${careerId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  

}

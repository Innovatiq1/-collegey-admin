import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { Invest, InvestListing, Collegeyfund,CollegeyfundListing } from '../models/invest.model';

const Logging = new Logger('investService');


@Injectable({
  providedIn: 'root'
})
export class InvestService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getInvestList(filter): Observable<InvestListing> {
    const apiUrl = this.defaultUrl + 'admin/invest/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }
  getInvestListForCSV(): Observable<InvestListing> {
    const apiUrl = this.defaultUrl + 'admin/invest/fetch_all';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  
  getInvestInfo(investId): Observable<Invest> {
    const apiUrl = `${this.defaultUrl}admin/invest/${investId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getCollegeyFundList(filter): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/collegefund/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getCollegeyFundListForCsv(): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/collegefund/fetch_all';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getCollegeyPartnerList(filter): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/collegepartner/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getCollegeyPartnerListForCsv(): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/collegepartner/fetch_all';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getCollegeyCareerList(filter): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/career/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }
  getCollegeyCareerListForCSV(): Observable<CollegeyfundListing> {
    const apiUrl = this.defaultUrl + 'admin/career/fetch_all';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  

}

import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { SchoolPartner, SchoolPartnerDetail } from '../models/user.model';
import { ApiResponse } from '../models/general.response';
import { map } from 'rxjs/operators';
import { SchoolPartnerProfile } from '../models/school-partner-profile.model';

const Logging = new Logger('SchoolPartnerService');


@Injectable({
  providedIn: 'root'
})
export class SchoolPartnerService {
  private schoolPartnerInfoSource = new BehaviorSubject<SchoolPartnerDetail>(null);
  schoolPartnerInfo: Observable<SchoolPartnerDetail> = this.schoolPartnerInfoSource.asObservable();

 
  private defaultUrl: string = environment['apiUrl'];

  constructor(private http: HttpClient) { }

  getSchoolPartnerList(): Observable<SchoolPartner> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=school';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data.data;
    }));
  }


  createSchoolPartner(formData): Observable<SchoolPartner> {
    const apiUrl = this.defaultUrl + 'admin/user/school-partner/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getSchoolPartnerInfo(partnerId) {
    const apiUrl = `${this.defaultUrl}admin/user/school-partner/${partnerId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        this.schoolPartnerInfoSource.next(response.data);
        return response.data;
      })
    );
  }

  updateSchoolPartner(formData, id): Observable<SchoolPartner> {
    const apiUrl = `${this.defaultUrl}admin/user/school-partner/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  saveProfile(id, data): Observable<any> {
    const baseUrl = this.defaultUrl + 'admin/user/profile/school-partner/' + id;
    return this.http.put<ApiResponse>(baseUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  getSchoolPartnerProfile(id): Observable<SchoolPartnerProfile> {
    const apiUrl = this.defaultUrl + 'admin/user/profile/school-partner/' + id;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

}

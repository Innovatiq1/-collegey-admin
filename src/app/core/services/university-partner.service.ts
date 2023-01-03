import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { UniversityPartner, UniversityPartnerDetail } from '../models/user.model';
import { ApiResponse } from '../models/general.response';
import { map } from 'rxjs/operators';
import { UniversityPartnerProfile } from '../models/university-partner-profile.model';

const Logging = new Logger('UniversityPartnerService');


@Injectable({
  providedIn: 'root'
})
export class UniversityPartnerService {
  private universityPartnerInfoSource = new BehaviorSubject<UniversityPartnerDetail>(null);
  universityPartnerInfo: Observable<UniversityPartnerDetail> = this.universityPartnerInfoSource.asObservable();

 
  private defaultUrl: string = environment['apiUrl'];

  constructor(private http: HttpClient) { }

  getUniversityPartnerList(): Observable<UniversityPartner> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=university';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data.data;
    }));
  }
  createUniversityPartner(formData): Observable<UniversityPartner> {
    const apiUrl = this.defaultUrl + 'admin/user/university-partner/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getUniversityPartnerInfo(partnerId) {
    const apiUrl = `${this.defaultUrl}admin/user/university-partner/${partnerId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        this.universityPartnerInfoSource.next(response.data);
        return response.data;
      })
    );
  }

  updateUniversityPartner(formData, id): Observable<UniversityPartner> {
    const apiUrl = `${this.defaultUrl}admin/user/university-partner/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  saveProfile(id, data): Observable<any> {
    const baseUrl = this.defaultUrl + 'admin/user/profile/university-partner/' + id;
    return this.http.put<ApiResponse>(baseUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  getUniversityPartnerProfile(id): Observable<UniversityPartnerProfile> {
    const apiUrl = this.defaultUrl + 'admin/user/profile/university-partner/' + id;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

}

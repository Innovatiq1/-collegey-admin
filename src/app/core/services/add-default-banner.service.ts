import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { AddDefaultBanner } from '../models/add-default-banner.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('AddDefaultBannerService');

@Injectable({
  providedIn: 'root'
})
export class AddDefaultBannerService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  addBanner(formData): Observable<AddDefaultBanner> {
    const apiUrl = this.defaultUrl + 'admin/bannerImage/addBanner';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  removeBannerImage(formData): Observable<AddDefaultBanner> {
    const apiUrl = this.defaultUrl + 'admin/bannerImage/removeBannerImage';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getBanners(bannerFor): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${bannerFor}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  editBanner(id, activeStatus): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${id}`;
    return this.http.put<ApiResponse>(apiUrl, {"isActivated": activeStatus}).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  deleteBanner(id): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImpactPartner, ImpactPartnerDetail } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('ImpactPartnersService');


@Injectable({
  providedIn: 'root'
})
export class ImpactPartnersService {
  
  private impactPartnerInfoSource = new BehaviorSubject<ImpactPartnerDetail>(null);
  impactPartnerInfo: Observable<ImpactPartnerDetail> = this.impactPartnerInfoSource.asObservable();


  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getImpactPartnerList(): Observable<ImpactPartner> {
    const apiUrl = this.defaultUrl + 'admin/user/impact-partner/';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  createImpactPartner(formData): Observable<ImpactPartner> {
    const apiUrl = this.defaultUrl + 'admin/user/impact-partner/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getImpactPartnerInfo(partnerId) {
    const apiUrl = `${this.defaultUrl}admin/user/impact-partner/${partnerId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        this.impactPartnerInfoSource.next(response.data);
        return response.data;
      })
    );
  }

  updateImpactPartner(formData, id): Observable<ImpactPartner> {
    const apiUrl = `${this.defaultUrl}admin/user/impact-partner/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }


}

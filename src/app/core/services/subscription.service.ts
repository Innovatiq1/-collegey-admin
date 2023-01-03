import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { Subscription, SubscriptionListing } from '../models/subscription.model';

const Logging = new Logger('subscriptionService');


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getSubscriptionList(filter): Observable<SubscriptionListing> {
    const apiUrl = this.defaultUrl + 'admin/subscription/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  
  getSubscriptionInfo(subscriptionId): Observable<Subscription> {
    const apiUrl = `${this.defaultUrl}admin/subscription/${subscriptionId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  

}

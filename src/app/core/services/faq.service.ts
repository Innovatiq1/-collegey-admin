import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { catchError } from 'rxjs/operators';


const Logging = new Logger('faqService');


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getFaqsList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/faq/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  createFaqs(formData): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/faq/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response;
    }));
  }

  createCategory(formData): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/faq/faqCategory';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response;
    }));
  }

  getCategoryList(): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/faq/faqCategory';
    return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  getFaqsInfo(faqId): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/faq/${faqId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  updateFaqs(formData, id): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/faq/${id}`;
    return this.http.patch<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  updateCategory(formData): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/faq/editFaqCategory`;
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  activationFaqsStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/faq/activationFaqsStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  


}

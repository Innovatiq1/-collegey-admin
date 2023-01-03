import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  constructor(private http: HttpClient) { }

  createHomepageContent = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addHomepageContent';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateHomepageContent = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateHomepageContent';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getHomeFirstSecData = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getHomeFirstSecData';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getHomeContentInfo = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getHomeContentInfo';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  deleteHomeContents = (data: any): Observable<any> => {
    const endpoint = environment.apiUrl + 'admin/mentor/deleteHomeContents';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
}

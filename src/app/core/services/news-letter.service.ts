import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NewsLetterService {
  constructor(private http: HttpClient) {}

  getNewsLetterData = (data: any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'subscription/newsLetterList';
    return this.http.post(apiUrl,data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCSVlist = (): Observable<any> => {
    const apiUrl = environment.apiUrl + 'subscription/csv';
    return this.http.post(apiUrl,'').pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
}


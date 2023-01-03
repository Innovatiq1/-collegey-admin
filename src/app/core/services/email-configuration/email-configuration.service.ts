import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  getForgetPasswordTemplate = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/emailConfiguration/getForgetPasswordTemplate';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addForgetPasswordTemplate = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/emailConfiguration/addForgetPasswordTemplate';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateForgetPasswordTemplate = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/emailConfiguration/updateForgetPasswordTemplate';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}

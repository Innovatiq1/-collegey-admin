import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetOurTeamService {

  constructor(private http: HttpClient) { }

  //title

  createMotTitle = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'meetOurTeam/addTitle';
    return this.http.post(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateMotTitle = (data:any,Id:any): Observable<any> => {
    let apiUrl = environment.apiUrl + 'meetOurTeam/updateTitle/'+`${Id}`;
    // if (Id) {
    //   apiUrl += `${Id}`;
    // }
    return this.http.put(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getTitleData = (data:any): Observable<any> => {
    const apiUrl = environment.apiEndpointNew + 'public/meetOurTeam/getTitle';
    return this.http.get(apiUrl,{params: data}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  

  //team

  getTeam() {
    const apiUrl = environment.apiEndpointNew + 'public/listteam';
    // return this.http.get(apiUrl).pipe(
    //   map((response) => {
    //     return response;
    //   })
    // );
    return this.http.get(apiUrl).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  createTeamMember = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'addteam';
    return this.http.post(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateTeamMember = (data:any,Id:any): Observable<any> => {
    let apiUrl = environment.apiUrl + 'updateteam/'+`${Id}`;
    // if (Id) {
    //   apiUrl += `${Id}`;
    // }
    return this.http.put(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  
  deleteTeamMember = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl + 'deleteteam/'+ `${data}`;
    return this.http.put(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}

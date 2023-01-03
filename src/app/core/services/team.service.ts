import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Team } from '../models/team.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { catchError } from 'rxjs/operators';

const Logging = new Logger('teamService');


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

/* Start Team Members */

  getTeamList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/team/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  createTeam(formData): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/team/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response;
    }));
  }


  getTeamInfo(teamId): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/team/${teamId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  updateTeam(formData, id): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/team/${id}`;
    return this.http.patch<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  updateTeamMemberStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/team/updateTeamMemberStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  
/* End Team Members */

/* Start Board of Advisors */

getBoardofAdvisorsList(filter): Observable<any> {
  const apiUrl = this.defaultUrl + 'admin/boardofadvisors/';
  return this.http.get<ApiResponse>(apiUrl, {
    params: filter
  }).pipe(map((response) => {
    Logging.debug(response);
    return response;
  }));
}

createBoardofAdvisors(formData): Observable<any> {
  const apiUrl = this.defaultUrl + 'admin/boardofadvisors/';
  return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
    Logging.debug(response);
    return response;
  }));
}


getBoardofAdvisorsInfo(BoardofId): Observable<any> {
  const apiUrl = `${this.defaultUrl}admin/boardofadvisors/${BoardofId}`;
  return this.http.get<ApiResponse>(apiUrl).pipe(
    map((response) => {
      Logging.debug(response);
      return response;
    })
  );
}

updateBoardofAdvisors(formData, id): Observable<any> {
  const apiUrl = `${this.defaultUrl}admin/boardofadvisors/${id}`;
  return this.http.patch<ApiResponse>(apiUrl, formData).pipe(
    map((response) => {
      Logging.debug(response);
      return response;
    })
  );
}


updateBoardofAdvisorsStatus = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/boardofadvisors/updateBoardofAdvisorsStatus';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

/* End Board of Advisors */

/* Start Board of Directors */

getBoardofDirectorsList(filter): Observable<any> {
  const apiUrl = this.defaultUrl + 'admin/boardofdirectors/';
  return this.http.get<ApiResponse>(apiUrl, {
    params: filter
  }).pipe(map((response) => {
    Logging.debug(response);
    return response;
  }));
}

createBoardofDirectors(formData): Observable<any> {
  const apiUrl = this.defaultUrl + 'admin/boardofdirectors/';
  return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
    Logging.debug(response);
    return response;
  }));
}


getBoardofDirectorsInfo(BoardofId): Observable<any> {
  const apiUrl = `${this.defaultUrl}admin/boardofdirectors/${BoardofId}`;
  return this.http.get<ApiResponse>(apiUrl).pipe(
    map((response) => {
      Logging.debug(response);
      return response;
    })
  );
}

updateBoardofDirectors(formData, id): Observable<any> {
  const apiUrl = `${this.defaultUrl}admin/boardofdirectors/${id}`;
  return this.http.patch<ApiResponse>(apiUrl, formData).pipe(
    map((response) => {
      Logging.debug(response);
      return response;
    })
  );
}

updateBoardofDirectorsStatus = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/boardofdirectors/updateBoardofDirectorsStatus';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


/* End Board of Directors */


}

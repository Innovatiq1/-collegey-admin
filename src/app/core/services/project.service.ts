import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject,throwError } from 'rxjs';
import { Project,PartnerId } from '../models/project.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { catchError } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/constants/app.constants';

const Logging = new Logger('projectService');


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private partnerIdSource = new BehaviorSubject<PartnerId>(null);
  partnerDetail: Observable<PartnerId> = this.partnerIdSource.asObservable();

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getProjectList(filter): Observable<Project> {
    const apiUrl = this.defaultUrl + 'admin/projects/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getStudentProjectList(filter): Observable<Project> {
    const apiUrl = this.defaultUrl + 'admin/projects/studentnewproject';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }
  
  getProjectFeesData = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/fetchProjectFeesData';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  createProjectFeesData = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/projects/addProjectFeesData';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };
  
  updateProjectFeesData = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/projects/updateProjectFeesData';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // getMentorProjectList(filter): Observable<Project> {
  //   const apiUrl = this.defaultUrl + 'admin/projects/mentornewproject';
  //   return this.http.get<ApiResponse>(apiUrl, {
  //     params: filter
  //   }).pipe(map((response) => {
  //     Logging.debug(response);
  //     return response.data;
  //   }));
  // }

  getMentorProjectList = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/projects/mentornewproject';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getProjectPaymentData = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/projects/getProjectPaymentData';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  sendProjectActivation(data): Observable<Project> {
    const apiUrl = `${this.defaultUrl}admin/projects/studentprojectActivation`;
    return this.http.post<ApiResponse>(apiUrl,data).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  sendMentorProjectActivation(data): Observable<Project> {
    const apiUrl = `${this.defaultUrl}admin/projects/mentorprojectActivation`;
    return this.http.post<ApiResponse>(apiUrl,data).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  createProject(formData): Observable<Project> {
    const apiUrl = this.defaultUrl + 'admin/projects/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }


  getProjectDetails(id): Observable<Project> {
    const apiUrl = `${this.defaultUrl}admin/projects/${id}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  deleteProject(id): Observable<Project> {
    const apiUrl = `${this.defaultUrl}admin/projects/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateProject(formData, id): Observable<Project> {
    const apiUrl = `${this.defaultUrl}admin/projects/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getPartnerId(): Observable<PartnerId[]> {
    const endPointUrl = this.defaultUrl + 'common/impact-partners';
    return this.http.get<ApiResponse>(endPointUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

  savePartnerId(partnerId) {
    localStorage.setItem(
      AppConstants.KEY_PARTNER_ID,
      JSON.stringify(partnerId)
    );
  }


  getOngoingProjectList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/project?projectStatus=ongoing';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  getProjectOrderedList(filter): Observable<Project> {
    const apiUrl = this.defaultUrl + '/booking';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

}

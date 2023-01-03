import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Feed } from '../models/feed.model';
import { catchError } from 'rxjs/operators';

const Logging = new Logger('QnaService');

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private defaultUrl: string = environment['apiUrl'];

  constructor(private http: HttpClient) {

  }

  getFeedList = (filter: any): Observable<any> => {
    const endpoint = environment.apiUrl + 'admin/collegeyFeed';
    return this.http.get(endpoint, { params: filter }).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };

  deleteFeed(data): Observable<any> {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/updateFeedStatus';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }
  editFeeds(data): Observable<any> {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/updateFeedPost';
    return this.http.put<ApiResponse>(apiUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }


  createAcademicBoxData = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/addAcademy';
    return this.http.post(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getAcademicBoxData = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/getAcademy';
    return this.http.get(apiUrl,{params: data}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateAcademicBoxData = (data:any,Id:any): Observable<any> => {
    let apiUrl = environment.apiUrl + 'admin/collegeyFeed/updateAcademy/'+`${Id}`;
    // if (Id) {
    //   apiUrl += `${Id}`;
    // }
    return this.http.put(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  createQuestionData = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/addQuestion';
    return this.http.post(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getQuestionData = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/getQuestion';
    return this.http.get(apiUrl,{params: data}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateQuestionData = (data:any,Id:any): Observable<any> => {
    let apiUrl = environment.apiUrl + 'admin/collegeyFeed/updateQuestion/'+`${Id}`;
    // if (Id) {
    //   apiUrl += `${Id}`;
    // }
    return this.http.put(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getAnswerData = (data:any): Observable<any> => {
    const apiUrl = environment.apiUrl + 'admin/collegeyFeed/getAnswer';
    return this.http.post(apiUrl, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  //get all groups
  getGroups = (data:any): Observable<any> => {
    const endpoint = environment.apiEndpointNew+'user/activity/allGroupList';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  //group post
  getGroupFeedById(docLimit): Observable<any> {
    return this.http.post(`${environment.apiUrl}collegeyFeed/groupWiseData`, docLimit).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      }));
  }

}

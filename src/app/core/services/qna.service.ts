import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Qna } from '../models/qna.model';

const Logging = new Logger('QnaService');

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  private defaultUrl: string = environment['apiUrl'];

  constructor(private http: HttpClient) { }

  getQnAList = (filter: any): Observable<any> => {
    const endpoint = environment.apiUrl + 'admin/questionsAndAnswers';
    return this.http.get(endpoint, { params: filter }).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };

  getQnAById(id): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/questionsAndAnswers/${id}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  };

  deleteQnA(data): Observable<any> {
    const apiUrl = environment.apiUrl + 'admin/questionsAndAnswers/updateQuestionStatus';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }
}

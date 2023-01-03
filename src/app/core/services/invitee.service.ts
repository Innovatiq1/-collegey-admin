import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { Invitee, InviteeListing } from '../models/invitee.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('inviteeService');


@Injectable({
  providedIn: 'root'
})
export class InviteeService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getInviteeList(filter): Observable<InviteeListing> {
    const apiUrl = this.defaultUrl + 'admin/invitee/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getInviteeJoinList(filter): Observable<InviteeListing> {
    const apiUrl = this.defaultUrl + 'admin/invitee/joininvitee';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }
 
  getInviteeJoinInfo(inviteeId): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/${inviteeId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  createInvitee(formData): Observable<Invitee> {
    const apiUrl = this.defaultUrl + 'admin/invitee/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }

  createInviteeJoin(formData): Observable<Invitee> {
    const apiUrl = this.defaultUrl + 'admin/invitee/joininvitee';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }
  
  createBulkInvitee(formData): Observable<Invitee[]> {
    const apiUrl = this.defaultUrl + 'admin/invitee/bulk';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }


  getInviteeInfo(inviteeId): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/${inviteeId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
 
  sendActivationCodeEmail(formData): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/activate/${formData.id}`;
    return this.http.post<ApiResponse>(apiUrl,formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  sendActivationInviteCodeEmail(formData): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/activate/${formData.id}`;
    return this.http.post<ApiResponse>(apiUrl,formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  sendinviteJoinRejected(formData): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/reject/${formData.invite_id}`;
    return this.http.post<ApiResponse>(apiUrl,formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateInvitee(formData, id): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateInviteejoin(formData, id): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
  
  deleteInviteeJoin(id): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response:any) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  deleteInvitee(id): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response:any) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  activeInvitee(data): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/active`;
    return this.http.post<ApiResponse>(apiUrl,data).pipe(
      map((response:any) => {
        Logging.debug(response);
        return response;
      })
    );
  }  
  
  activeInviteeJoin(data): Observable<Invitee> {
    const apiUrl = `${this.defaultUrl}admin/invitee/joininvitee/active`;
    return this.http.post<ApiResponse>(apiUrl,data).pipe(
      map((response:any) => {
        Logging.debug(response);
        return response;
      })
    );
  }


}

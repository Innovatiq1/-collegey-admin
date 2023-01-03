import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, StudentDetail } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';

const Logging = new Logger('StudentService');

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  
  private studentInfoSource = new BehaviorSubject<StudentDetail>(null);
  studentInfo: Observable<StudentDetail> = this.studentInfoSource.asObservable();

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) {}
  
  getStudentsList(filter): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=student';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }

  getCurrentUserDataFetch = (data:any): Observable<any> => {
    const endpoint = environment.apiNewEndpoint+'forget/profile/getCurrentUserDataFetch';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

//   getDownload(obj): Observable<Student> {
//   //   const apiUrl = this.defaultUrl + 'admin/universitylogo/file';
//   //   return this.http
//   //     .post<ApiResponse>(apiUrl, obj) 
//   //     .pipe(map((response) => response.data.data));
//   // }
//   const apiUrl = this.defaultUrl + 'admin/universitylogo/file';
//   return this.http.post<ApiResponse>(apiUrl, obj).pipe(
//     map((response) => {
//       console.log("this is responssss",response)
//       Logging.debug(response);
//       return response;
//     })
//   );
// }
// getDownload(obj): Observable<any> {
//   const baseUrl = this.defaultUrl + 'admin/universitylogo/file';
//   return this.http.post<ApiResponse>(baseUrl, obj).pipe(
//     map((response) => {
//       Logging.debug(response);
//       return response;
//     })
//   );
// }

// getDownload(obj): Observable<Student> {
//   const apiUrl = this.defaultUrl + 'admin/universitylogo/file';
//   return this.http
//     .post<ApiResponse>(apiUrl, obj) 
//     .pipe(map((response) => response.data));
// }

getDownload(obj): Observable<Student> {
  const apiUrl = this.defaultUrl + 'admin/universitylogo/file';
  return this.http
    .post<ApiResponse>(apiUrl, obj) 
    .pipe(map((response) => response.data));
}

getDownloadMentor(obj): Observable<Student> {
  const apiUrl = this.defaultUrl + 'admin/universitylogo/mentorfile';
  return this.http
    .post<ApiResponse>(apiUrl, obj) 
    .pipe(map((response) => response.data));
}

  getStudentProfile(sId) {
    const apiUrl = this.defaultUrl + 'admin/user/profile/student/' + sId;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

  saveStudent(formData): Observable<Student> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=student';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateStudent(formData, id): Observable<Student> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getStudentInfo(userId) {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${userId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        this.studentInfoSource.next(response.data);
        return response.data.data;
      })
    );
  }

  saveStudentProfile(sId, data): Observable<any> {
    const baseUrl = this.defaultUrl + 'admin/user/profile/student/' + sId;
    return this.http.put<ApiResponse>(baseUrl, data).pipe(
      map((response) => {
        Logging.debug(response);
        return response;
      })
    );
  }

  updateUserStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/adminUserListing/updateUserStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
}

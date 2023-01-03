import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/courses.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/general.response';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('CoursesService');

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getCoursesList(filter): Observable<Course> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/courses`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getCourseDetails(id): Observable<Course> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/courses/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }
  deleteCourse(id): Observable<Course> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/courses/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  saveCourses(formData): Observable<Course> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/courses`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  updateCourses(data: FormData, cid): Observable<Course> {
    return this.http.put<ApiResponse>(`${environment.apiUrl}admin/courses/${cid}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
}
}

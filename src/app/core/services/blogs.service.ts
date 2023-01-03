import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general.response';
import { Observable, BehaviorSubject } from 'rxjs';
import { Blog } from '../models/blog.model';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';

const Logging = new Logger('blogsService');


@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  getBlogsList(filter): Observable<Blog> {
    const apiUrl = this.defaultUrl + 'admin/blogs/';
    return this.http.get<ApiResponse>(apiUrl, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  createBlog(formData): Observable<Blog> {
    const apiUrl = this.defaultUrl + 'admin/blogs/';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }


  getBlogInfo(blogId): Observable<Blog> {
    const apiUrl = `${this.defaultUrl}admin/blogs/${blogId}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateBlog(formData, id): Observable<Blog> {
    const apiUrl = `${this.defaultUrl}admin/blogs/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

}

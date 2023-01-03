import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { Uploadlogo, Uploadcollegelogo, Uploaduniversitylogo,AssignBadge } from '../models/uploadlogo.model';
import { ApiResponse } from '../models/general.response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { catchError } from 'rxjs/operators';
import { Student, StudentDetail } from '../models/user.model';

const Logging = new Logger('UploadlogoService');

@Injectable({
  providedIn: 'root'
})
export class UploadlogoService {

  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }

  /* Start Upload Logo Services */

  getUploadlogoList(filter): Observable<Uploadlogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/logo`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  saveUploadlogo(formData): Observable<Uploadlogo> {
    console.log("uploadLogo Service  ",formData);
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/logo`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getUploadlogoDetails(id): Observable<Uploadlogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/logo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  updateUploadlogo(data: FormData, con): Observable<Uploadlogo> {
    return this.http.patch<ApiResponse>(`${environment.apiUrl}admin/logo/${con}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
  }

  deleteUploadLogo(id): Observable<Uploadlogo> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/logo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
    }));
  }
     
  updateUploadLogoStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/logo/updateUploadLogoStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

/* End Upload Logo Services */
  

  /* Start College Logo Services */

  getUploadCollegeLogoList(filter): Observable<Uploadcollegelogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/collegelogo`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  saveUploadCollegeLogo(formData): Observable<Uploadcollegelogo> {
    console.log("UploadCollegeLogo Service  ",formData);
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/collegelogo`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getUploadCollegeLogoDetails(id): Observable<Uploadcollegelogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/collegelogo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  updateUploadCollegeLogo(data: FormData, con): Observable<Uploadcollegelogo> {
    return this.http.patch<ApiResponse>(`${environment.apiUrl}admin/collegelogo/${con}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
  }

  deleteUploadCollegeLogo(id): Observable<Uploadcollegelogo> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/collegelogo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
    }));
  }
     
  updateUploadCollegeLogoStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/collegelogo/updateUploadCollegeLogoStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  } 

/* End Upload Logo Services */
  

  /* Start Upload Logo Services */

  getUploadUniversityLogoList(filter): Observable<Uploaduniversitylogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/universitylogo`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  saveUploadUniversityLogo(formData): Observable<Uploaduniversitylogo> {
    console.log("UploadUniversityLogo Service  ",formData);
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/universitylogo`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getUploadUniversityLogoDetails(id): Observable<Uploaduniversitylogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/universitylogo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  updateUploadUniversityLogo(data: FormData, con): Observable<Uploaduniversitylogo> {
    return this.http.patch<ApiResponse>(`${environment.apiUrl}admin/universitylogo/${con}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
  }

  deleteUploadUniversityLogo(id): Observable<Uploaduniversitylogo> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/universitylogo/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
    }));
  }
     
  updateUploadUniversityLogoStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/universitylogo/updateUploadUniversityLogoStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

/* End Upload Logo Services */
  

  /* Start Badge Logo Services */

  getUploadBadgeLogoList(filter): Observable<Uploadcollegelogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/badge`, {
      params: filter
    }).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  saveUploadBadgeLogo(formData): Observable<Uploadcollegelogo> {
    console.log("UploadBadgeLogo Service  ",formData);
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/badge`, formData).pipe(map((response) => {
      Logging.debug(response);
      return response.data;
    }));
  }

  getUploadBadgeLogoDetails(id): Observable<Uploadcollegelogo> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}admin/badge/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }));
  }

  updateUploadBadgeLogo(data: FormData, con): Observable<Uploadcollegelogo> {
    return this.http.patch<ApiResponse>(`${environment.apiUrl}admin/badge/${con}`, data).pipe(map(response => {
        Logging.debug(response.data);
        return response.data;
    }))
  }

  deleteUploadBadgeLogo(id): Observable<Uploadcollegelogo> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/badge/${id}`).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
    }));
  }
     
  updateUploadBadgeLogoStatus = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/badge/updateUploadbadgeStatus';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  } 

/* End Upload Badge Services */

/* Start Assigned badges to Users  */

getActiveBadgeList(filter): Observable<Uploadcollegelogo> {
  return this.http.get<ApiResponse>(`${environment.apiUrl}admin/badge/getActivateBadge`, {
    params: filter
  }).pipe(map((response) => {
    Logging.debug(response);
    return response.data;
  }));
}

getUsersList(userType): Observable<Student> {
  const apiUrl = this.defaultUrl + 'admin/adminUserListing?type='+userType+'&limit=500';
  return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => response.data.data));
}
 

getAssignBadgeList(filter): Observable<AssignBadge> {
  return this.http.get<ApiResponse>(`${environment.apiUrl}admin/assignbadge`, {
    params: filter
  }).pipe(map((response) => {
    Logging.debug(response);
    return response.data;
  }));
}

saveAssignBadge(formData): Observable<AssignBadge> {
  console.log("AssignBadge Service  ",formData);
  return this.http.post<ApiResponse>(`${environment.apiUrl}admin/assignbadge`, formData).pipe(map((response) => {
    Logging.debug(response);
    return response.data;
  }));
}

getAssignBadgeDetails(id): Observable<AssignBadge> {
  return this.http.get<ApiResponse>(`${environment.apiUrl}admin/assignbadge/${id}`).pipe(map(response => {
    Logging.debug(response.data);
    return response.data;
}));
}

updateAssignBadge(data: FormData, con): Observable<AssignBadge> {
  return this.http.patch<ApiResponse>(`${environment.apiUrl}admin/assignbadge/${con}`, data).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
  }))
}

deleteAssignBadge(id): Observable<AssignBadge> {
  return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/assignbadge/${id}`).pipe(map(response => {
    Logging.debug(response.data);
    return response.data;
  }));
}
   
updateAssignBadgeStatus = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/assignbadge/updateAssignBadgeStatus';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
} 
/* End Assigned badges to Users  */
  
}

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  createStudentResources = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/addResources';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getStudentResourcesList = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/getStudentResourcesList';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getStudentResourceInfo = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/getStudentResourceInfo';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };
  
  updateStudentResource = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/student/updateStudentResource';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteStudentResource = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/deleteStudentResource';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // Student artical

  createStudentArticle = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/addStudentArticle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getStudentArticleList = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/getStudentArticleList';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getStudentArticleInfo = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/getStudentArticleInfo';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateStudentArticle = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/student/updateStudentArticle';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteStudentArticle = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/student/deleteStudentArticle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

// Curated Resources

createCuratedresources = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addCuratedresources';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};  

getStudentCuratedList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentCuratedList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getStudentCuratedInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentCuratedInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateCuratedresources = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/student/updateCuratedresources';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

deleteStudentCurated = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/deleteStudentCurated';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

//  Student File

createStudentFile = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addStudentFile';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getStudentFileList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentFileList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

deleteStudentFile = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/deleteStudentFile';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Get testimonial data

getStudentTestimonialList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentTestimonialList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

updatetestimonialStatus = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/updatetestimonialStatus';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Aggrement Services Api

createNewAgreement = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addNewAgreement';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
}; 

updateAgreementTerms = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/student/updateAgreementTerms';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getAgreementInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getAgreementInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getAgreementTermsList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getAgreementTermsList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


// Privacy Policy Api

createNewPrivacy = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addNewPrivacy';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
}; 

updatePrivacy = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/student/updatePrivacy';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getPrivacyInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getPrivacyInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getPrivacyList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getPrivacyList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Start Student Perks Function 

getStudentPerksList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentPerksList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getStudentPerksInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getStudentPerksInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};


createStudentPerks = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addPerks';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateStudentPerks = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/student/updateStudentPerks';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


deleteStudentPerks = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/deleteStudentPerks';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// End Student Perks Function 


// Start CollegeyOpportunities Function 

getCollegeyOpportunitiesList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getCollegeyOpportunitiesList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getCollegeyOpportunitiesInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/getCollegeyOpportunitiesInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};


createCollegeyOpportunities = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/addCollegeyOpportunities';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateCollegeyOpportunities = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/student/updateCollegeyOpportunities';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


deleteCollegeyOpportunities = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/student/deleteCollegeyOpportunities';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


// End CollegeyOpportunities Function 

}

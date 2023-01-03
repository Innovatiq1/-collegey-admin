import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http: HttpClient) { }

  createMentorResources = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addResources';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getMentorResourcesList = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getMentorResourcesList';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getMentorResourceInfo = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getMentorResourceInfo';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };
  
  updateMentorResource = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateMentorResource';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMentorResource = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/deleteMentorResource';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

    // Mentor Resource Title

  createMentorResourceTitle= (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addResourceTitle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

 getMentorResourceTitle = (): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getMentorResourceTitle';
    return this.http.get(endpoint).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  updateMentorResourceTitle = (data:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateMentorResourceTitle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // Mentor artical

  createMentorArticle = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addMentorArticle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getMentorArticleList = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getMentorArticleList';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getMentorArticleInfo = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/getMentorArticleInfo';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateMentorArticle = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateMentorArticle';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMentorArticle = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/deleteMentorArticle';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

// Curated Resources

createCuratedresources = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addCuratedresources';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};  

getMentorCuratedList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorCuratedList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getMentorCuratedInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorCuratedInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateCuratedresources = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/mentor/updateCuratedresources';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

deleteMentorCurated = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/deleteMentorCurated';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

//  Mentor File

createMentorFile = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addMentorFile';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getMentorFileList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorFileList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

deleteMentorFile = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/deleteMentorFile';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Get testimonial data

getMentorTestimonialList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorTestimonialList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

updatetestimonialStatus = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/updatetestimonialStatus';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Aggrement Services Api

createNewAgreement = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addNewAgreement';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
}; 

updateAgreementTerms = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/mentor/updateAgreementTerms';
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
  const endpoint = environment.apiUrl+'admin/mentor/getAgreementInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getAgreementTermsList = (filter:any,type_policy:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getAgreementTermsList?type_policy='+type_policy;
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


// Privacy Policy Api

createNewPrivacy = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addNewPrivacy';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
}; 

updatePrivacy = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/mentor/updatePrivacy';
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
  const endpoint = environment.apiUrl+'admin/mentor/getPrivacyInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

getPrivacyList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getPrivacyList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// Start Mentor Perks Function 

getMentorPerksList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorPerksList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getMentorPerksInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getMentorPerksInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};


createMentorPerks = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addPerks';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateMentorPerks = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/mentor/updateMentorPerks';
  if (Id) {
    endpoint += `?id=${Id}`;
  }
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


deleteMentorPerks = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/deleteMentorPerks';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// End Mentor Perks Function 


// Start CollegeyOpportunities Function 

getCollegeyOpportunitiesList = (filter:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getCollegeyOpportunitiesList';
  return this.http.get(endpoint,{params: filter}).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

getCollegeyOpportunitiesInfo = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/getCollegeyOpportunitiesInfo';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};


createCollegeyOpportunities = (data:any): Observable<any> => {
  const endpoint = environment.apiUrl+'admin/mentor/addCollegeyOpportunities';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  ); 
};

updateCollegeyOpportunities = (data:any,Id:any): Observable<any> => {
  let endpoint = environment.apiUrl+'admin/mentor/updateCollegeyOpportunities';
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
  const endpoint = environment.apiUrl+'admin/mentor/deleteCollegeyOpportunities';
  return this.http.post(endpoint, data).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


// End CollegeyOpportunities Function 



}

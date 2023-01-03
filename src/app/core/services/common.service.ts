import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logger } from 'src/app/core/services/logger.service';
import { map } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/constants/app.constants';

const Logging = new Logger('CommonService');

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  uploadImage(formData, source): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}common/upload-files/${source}`,
        formData
      )
      .pipe(
        map((response) => {
          Logging.debug(response.files);
          return response.files;
        })
      );
  }


  imagePathMaker(imageName) {
    return imageName
      ? `${environment.awsUrl}${imageName}`
      : '/assets/images/choose-profile-image.svg';
  }

  imagePathS3(imageName, commonImage?){
    return imageName ? `${environment.filesPath}${imageName}` : commonImage;
  }

  findExpectedRole(Id): boolean {
    const {user} = JSON.parse(localStorage.getItem(AppConstants.KEY_USER_DATA));
    let isExpectedRole = false;
    if(user.user_type === Id) {
      isExpectedRole = true;
    }
    return isExpectedRole;
}

  
}

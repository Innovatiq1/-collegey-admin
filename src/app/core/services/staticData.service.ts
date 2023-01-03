import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/general.response';
import { environment } from 'src/environments/environment';
import { Logger } from 'src/app/core/services/logger.service';
import { map } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Countries, Cities, State } from '../models/staticData.model';
import { FormGroup } from '@angular/forms';

const Logging = new Logger('StaticDataService');

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  constructor(private http: HttpClient) {}

  _getStaticDataList(): Observable<any> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}master/get-static-data-list`).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

  getCountries(): Observable<Countries[]> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}master/country`).pipe(
      map((response) => {
        this.getCountryPhoneCode(response.data)
        Logging.debug(response);
        return response.data;
      })
    );
  }

  getCountryPhoneCode(countryData) {
    const phoneCodeArray = countryData.map(item => item.phone_code).filter(phoneCode => phoneCode);
    localStorage.setItem(AppConstants.KEY_COUNTRY_PHONE_CODE, JSON.stringify(phoneCodeArray));
  }

  getStates(countryId): Observable<State[]> {
    let headers = new HttpHeaders();
    headers = headers.set('no-auth' , 'true');
    return this.http.get<ApiResponse>(`${environment.apiUrl}master/state/${countryId}` , { headers }).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

  getCities(stateId): Observable<Cities[]> {
    let headers = new HttpHeaders();
    headers = headers.set('no-auth' , 'true');
    return this.http.get<ApiResponse>(`${environment.apiUrl}master/city/${stateId}`, { headers }).pipe(
      map((response) => {
        Logging.debug(response);
        return response.data;
      })
    );
  }

  saveCountries(countries) {
    localStorage.setItem(
      AppConstants.KEY_COUNTRIES_DATA,
      JSON.stringify(countries)
    );
  }
  _saveStaticDataList(data) {
    localStorage.setItem(AppConstants.KEY_STATIC_DATA, JSON.stringify(data));
  }

  getStaticProfileForm() {
    return this.http.get<FormGroup>('/assets/form.json');
  }

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

}

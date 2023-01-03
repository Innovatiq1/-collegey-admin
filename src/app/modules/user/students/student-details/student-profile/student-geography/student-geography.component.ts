import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { Countries, State, Cities } from 'src/app/core/models/staticData.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Geography } from 'src/app/core/models/student-profile.model';
import { StudentService } from 'src/app/core/services/student.service';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-student-geography',
  templateUrl: './student-geography.component.html',
  styleUrls: ['./student-geography.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentGeographyComponent implements OnInit, OnDestroy {
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()onSubmitGeographyForm = new EventEmitter();
  panelOpenState = false;
  countries: Countries[] = JSON.parse(localStorage.getItem('countries_data'));
  states: State[];
  cities: Cities[];
  geographyFormGroup: FormGroup;
  geographyFormSubscription: Subscription;
  constructor(
    private staticDataService: StaticDataService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
  ) {}

  initGeographyForm() {
    let studentJsonData: Observable<FormGroup>;
    if (Object.keys(this.studentProfileData).length > 0) {
      studentJsonData = of(this.studentProfileData);
    } else {
      studentJsonData = this.staticDataService.getStaticProfileForm();
    }
    return studentJsonData.pipe(
      map((apiResponse: any) =>
        this.fb.group({
          student_profile: this.fb.group({
            geography: this.generateGeographyForm(
              apiResponse.student_profile.geography
            ),
          }),
        })
      )
    );
  }

  generateGeographyForm(geography: Geography) {
    return this.fb.group({
      // school_clg_name: [geography ? geography.school_clg_name : null],
      // school_clg_city: [geography ? geography.school_clg_city : null],
      citizenship: [geography ? geography.citizenship : null],
      country: [geography ? geography.country : null],
      city: [geography ? geography.city : null],
      state: [geography ? geography.state : null],
      is_completed: [false],
    });
  }

  onSelectCountry(country) {
    this.getStateList(country.id);
  }

  getStateList(id) {
    this.staticDataService.getStates(id).subscribe(
      (response) => {
        this.states = response;
        if (response.length > 0) {
          this.geographyFormGroup
            .get('student_profile')
            .get('geography')
            .get('state')
            .enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  getCityList(id) {
    this.staticDataService.getCities(id).subscribe(
      (response) => {
        this.cities = response;
        if (this.cities.length > 0) {
          this.geographyFormGroup
            .get('student_profile')
            .get('geography')
            .get('city')
            .enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }
  onSelectState(state) {
    this.getCityList(state.id);
  }

  ngOnInit(): void {
    this.geographyFormSubscription = this.initGeographyForm().subscribe(
      (form) => {
        this.geographyFormGroup = form;
        const countryId = this.geographyFormGroup
          .get('student_profile')
          .get('geography')
          .get('country').value;
        const stateId = this.geographyFormGroup
          .get('student_profile')
          .get('geography')
          .get('state').value;
        if (stateId) {
          this.getCityList(stateId);
        }
        if (countryId) {
          this.getStateList(countryId);
        } else {
          this.geographyFormGroup
            .get('student_profile')
            .get('geography')
            .get('state')
            .disable();
          this.geographyFormGroup
            .get('student_profile')
            .get('geography')
            .get('city')
            .disable();
        }
      }
    );
  }

  onSubmitForm() {
    this.onSubmitGeographyForm.emit(this.geographyFormGroup.getRawValue());

  }

  ngOnDestroy(): void {
    this.geographyFormSubscription.unsubscribe();
  }
}

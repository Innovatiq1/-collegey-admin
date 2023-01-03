import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Observable, of, Subscription } from 'rxjs';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { map } from 'rxjs/operators';
import { Interest } from 'src/app/core/models/student-profile.model';

@Component({
  selector: 'app-student-interests-areas',
  templateUrl: './student-interests-areas.component.html',
  styleUrls: ['./student-interests-areas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentInterestsAreasComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitInterestForm = new EventEmitter();
  interestFormSubscription: Subscription;

  interestAreas = AppConstants.STUDENT_INTERESTED_AREAS;
  studentFavoriteSubjects = AppConstants.STUDENT_FAVORITE_SUBJECTS;


  studentInterestForm: FormGroup;
  constructor(
    private staticDataService: StaticDataService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.interestFormSubscription = this.initInterestFormGroup().subscribe(form => {
      this.studentInterestForm = form;
    });
  }

  initInterestFormGroup() {
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
            interest: this.generateInterestForm(apiResponse.student_profile.interest),
          }),
        })
      )
    );
  }

  generateInterestForm(interest: Interest) {
    return this.fb.group({
      interest_area: [interest.interest_area],
      fav_subjects: [interest.fav_subjects],
      is_completed: [false]
    });
  }

  typeCastToFormArray(formGroup: AbstractControl) {
    return formGroup as FormArray;
  }

  addTagFn(name) {
    return { name};
  }

  onSubmitForm() {
    this.onSubmitInterestForm.emit(this.studentInterestForm.getRawValue());
  }

  ngOnDestroy(): void {
    this.interestFormSubscription.unsubscribe();
  }

}

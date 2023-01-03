import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { map } from 'rxjs/operators';
import { WaysToBeInTouch } from 'src/app/core/models/student-profile.model';
import { StudentService } from 'src/app/core/services/student.service';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-student-get-in-touch',
  templateUrl: './student-get-in-touch.component.html',
  styleUrls: ['./student-get-in-touch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentGetInTouchComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitGetInTouchForm = new EventEmitter();
  getInTouchForm: FormGroup;
  getInTouchFormSubscription: Subscription;

  parentsDetailsFormArray: FormArray;
  counselorDetailsFormArray: FormArray;

  countryPhoneCode = JSON.parse(localStorage.getItem(AppConstants.KEY_COUNTRY_PHONE_CODE));

  constructor(
    private staticDataService: StaticDataService,
    private fb: FormBuilder,
  ) {
  }

  typeCastToFormArray(formGroup: string) {
    return this.getInTouchForm.get('student_profile').get('ways_to_be_in_touch').get(formGroup) as FormArray;
  }

  onRemoveSocialMedia(index) {
    this.typeCastToFormArray('social_media').removeAt(index);
  }

  initGetInTouchForm() {
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
            ways_to_be_in_touch: this.generateTouchForm(apiResponse.student_profile.ways_to_be_in_touch),
          }),
        })
      )
    );
  }

  generateTouchForm(waysToBeTouch: WaysToBeInTouch) {
    return this.fb.group({
      dob: [waysToBeTouch ? waysToBeTouch.dob : null],
      phone_number: this.fb.group({
        extension: [waysToBeTouch?.phone_number?.extension],
        number: [waysToBeTouch?.phone_number?.number, [Validators.pattern(AppConstants.PHONE_PATTERN)]],
        tag: [waysToBeTouch?.phone_number?.tag],
      }),
      parents_details: this.fb.array(
        waysToBeTouch.parents_details.length > 0 ?
         waysToBeTouch.parents_details.map((parentDetail) => this.addParentDetailFormGroup(parentDetail)) :
        [this.addParentDetailFormGroup(),this.addParentDetailFormGroup() ]
      ),
      school_counselor: this.fb.array(
        waysToBeTouch.school_counselor.length > 0 ? 
        waysToBeTouch.school_counselor.map((counselor) => this.addSchoolCounselorFormGroup(counselor)) :
         [this.addSchoolCounselorFormGroup()]
      ),
      social_media: this.fb.array(
        (waysToBeTouch.social_media && waysToBeTouch.social_media.length > 0 ) ?
        waysToBeTouch.social_media.map(item => this.addSocialMediaFormGroup(item)) :
        [this.addSocialMediaFormGroup()]
      ),
      is_completed: [waysToBeTouch.is_completed ? waysToBeTouch.is_completed : false  ],
    });
  }

  addSocialMediaFormGroup(socialMedia?) {
    return this.fb.group({
      channel_name: [socialMedia ? socialMedia.channel_name : null],
      channel_link: [socialMedia ? socialMedia.channel_link : null]
    });
  }

  onClickAddSocialMedial() {
    this.typeCastToFormArray('social_media')
    .push(this.addSocialMediaFormGroup());
  }

  addSchoolCounselorFormGroup(counselor?) {
    console.log(counselor);
    return this.fb.group({
      name: [counselor ? counselor.name :  null],
      email: [counselor ? counselor.email : null, [Validators.pattern(AppConstants.EMAIL_PATTERN)]],
    });
  }

  addParentDetailFormGroup(parentDetail?) {
    return this.fb.group({
      name: [parentDetail ? parentDetail.name : null],
      email: [parentDetail ? parentDetail.email : null, [Validators.pattern(AppConstants.EMAIL_PATTERN)]],
      relation: [parentDetail ? parentDetail.relation : null],
    });
  }
  ngOnInit() {
    this.getInTouchFormSubscription = this.initGetInTouchForm().subscribe((form) => {
      this.getInTouchForm = form;
      this.parentsDetailsFormArray = this.typeCastToFormArray('parents_details');
      this.counselorDetailsFormArray = this.typeCastToFormArray('school_counselor');
    });
  }

  ngOnDestroy(): void {
    this.getInTouchFormSubscription.unsubscribe();
  }

  onSubmitForm() {
    // console.log(this.getInTouchForm.getRawValue());
    if (this.getInTouchForm.invalid) {
      return;
    }
    this.onSubmitGetInTouchForm.emit(this.getInTouchForm.getRawValue());
  }
}

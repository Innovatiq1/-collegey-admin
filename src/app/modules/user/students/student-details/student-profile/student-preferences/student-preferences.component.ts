import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/core/services/student.service';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { map } from 'rxjs/operators';
import { Preferences } from 'src/app/core/models/student-profile.model';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-student-preferences',
  templateUrl: './student-preferences.component.html',
  styleUrls: ['./student-preferences.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPreferencesComponent implements OnInit, OnDestroy {
  studentPayPerYears = AppConstants.PAY_PER_YEAR;
  studentFamilyIncomes = AppConstants.FAMILY_INCOME;

  studentPreferencesForm: FormGroup;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitPreferencesForm = new EventEmitter();
  preferencesFormSubscription: Subscription;
  panelOpenState = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private staticDataService: StaticDataService,
    private utilService: UtilsService
  ) {}

  initPreferencesForm() {
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
            prefrences: this.generatePreferencesForm(
              apiResponse.student_profile.prefrences
            ),
          }),
        })
      )
    );
  }

  generatePreferencesForm(preferences: Preferences) {
    return this.fb.group({
      interested_in_gap: [preferences.interested_in_gap],
      how_would_like_to_pay: [preferences.how_would_like_to_pay],
      wish_to_apply_for_scholarships: this.generateScholarshipForm(
        preferences.wish_to_apply_for_scholarships
      ),
      family_income: [preferences ? preferences.family_income : null],
      is_completed: [false],
    });
  }

  generateScholarshipForm(formGroup) {
    return this.fb.group({
      answer: [formGroup ? formGroup.answer : null],
      imoprtance: [formGroup ? formGroup.imoprtance : null],
    });
  }

  onSubmitForm() {
    const formData = this.studentPreferencesForm.getRawValue();
    if (
      formData.student_profile.prefrences.wish_to_apply_for_scholarships
        .answer != 'true'
    ) {
      formData.student_profile.prefrences.wish_to_apply_for_scholarships.imoprtance = null;
    }

    this.onSubmitPreferencesForm.emit(formData);
  }

  ngOnInit(): void {
    this.preferencesFormSubscription = this.initPreferencesForm().subscribe(
      (form) => {
        this.studentPreferencesForm = form;

        console.log(this.studentPreferencesForm);
      }
    );
  }

  ngOnDestroy(): void {
    this.preferencesFormSubscription.unsubscribe();
  }
}

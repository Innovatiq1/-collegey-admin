import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { Countries } from 'src/app/core/models/staticData.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { GenerateProfileFormService } from 'src/app/core/services/generate-profile-form.service';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { StudentService } from 'src/app/core/services/student.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Headed } from 'src/app/core/models/student-profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-headed',
  templateUrl: './student-headed.component.html',
  styleUrls: ['./student-headed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentHeadedComponent implements OnInit, OnDestroy {
  studentHeadedForm: FormGroup;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitHeadedForm = new EventEmitter();
  panelOpenState = false;
  countries: Countries[] = JSON.parse(localStorage.getItem('countries_data'));
  studentTests = AppConstants.STUDENT_TESTS;
  studentSubjects = AppConstants.STUDENT_SUBJECT;
  studentHeadedFormSubscription: Subscription;

constructor(
    private staticDataService: StaticDataService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private utilService: UtilsService
  ) {
  }

ngOnInit(): void {
    this.studentHeadedFormSubscription = this.initStudentHeadedForm().subscribe(
      (form) => {
        this.studentHeadedForm = form;
      }
    );
  }

initStudentHeadedForm() {
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
            headed: this.generateHeadedForm(apiResponse.student_profile.headed),
          }),
        })
      )
    );
  }

generateHeadedForm(headed: Headed) {
    return this.fb.group({
      expected_year_to_start: this.fb.group({
        grade: [
          headed.expected_year_to_start
            ? headed.expected_year_to_start.grade
            : null,
        ],
        year: [
          headed.expected_year_to_start
            ? headed.expected_year_to_start.year
            : null,
        ],
      }),
      wish_to_study: this.fb.group({
        grade: [headed.wish_to_study ? headed.wish_to_study.grade : null],
        subjects: [headed.wish_to_study ? headed.wish_to_study.subjects : null],
        majors: [headed.wish_to_study ? headed.wish_to_study.majors : null],
        other_text: [
          headed.wish_to_study ? headed.wish_to_study.other_text : null,
        ],
      }),
      preferred_countries: [headed.preferred_countries],
      test_info: this.fb.array(
        headed.test_info.length > 0
          ? headed.test_info.map((item) => this.addStudentTest(item))
          : [this.addStudentTest()]
      ),
      is_completed: false,
    });
  }

addStudentTest(testInfo?) {
    return this.fb.group({
      test_name: [testInfo ? testInfo.test_name : null],
      test_status: [testInfo ? testInfo.test_status : null],
      current_score: [testInfo ? testInfo.current_score : null],
      test_date: [testInfo ? testInfo.test_date : null],
      other_text: [testInfo ? testInfo.other_text : null],
    });
  }

typeCastToFormArray(formGroup: AbstractControl) {
    return formGroup as FormArray;
  }

removeStudentTests(index) {
    this.typeCastToFormArray(
      this.studentHeadedForm
        .get('student_profile')
        .get('headed')
        .get('test_info')
    ).removeAt(index);
  }

onAddStudentTests() {
    this.typeCastToFormArray(
      this.studentHeadedForm
        .get('student_profile')
        .get('headed')
        .get('test_info')
    ).push(this.addStudentTest());
  }

onSubmitForm() {
    this.onSubmitHeadedForm.emit(this.studentHeadedForm.getRawValue());
  }

ngOnDestroy(): void {
    this.studentHeadedFormSubscription.unsubscribe();
 
  }
}

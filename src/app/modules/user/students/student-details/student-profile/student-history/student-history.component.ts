import {
  Component,
  OnInit,
  NgModule,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { map } from 'rxjs/operators';
import { History, Education, StudentSchoolScore } from 'src/app/core/models/student-profile.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentHistoryComponent implements OnInit, OnDestroy {
  studentHistoryForm: FormGroup;
  studentSchoolBoards = AppConstants.STUDENT_SCHOOL_BOARD;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitHistoryForm = new EventEmitter();
  historyFormSubscription: Subscription;
  studentFavoriteSubjects = AppConstants.STUDENT_FAVORITE_SUBJECTS;
  panelOpenState = false;
  educationFormArray: FormArray;
  years: number[];

  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,

  ) {}
  initHistoryForm() {
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
            history: this.generateHistoryForm(
              apiResponse.student_profile.history
            ),
          }),
        })
      )
    );
  }

  addTagFn(name) {
    return { name};
  }

  typeCastToFormArray(formGroup: AbstractControl) {
    return formGroup as FormArray;
  }

  generateHistoryForm(history: History) {
    return this.fb.group({
      education: this.fb.array(history.education.length > 0 ?
          history.education.map(item => this.createEducationFormGroup(item)) :
      [this.createEducationFormGroup()]),
      current_class: [],
      is_completed: [false]
    });
  }

  onRemoveEducation(index) {
    this.educationFormArray.removeAt(index);
  }

  onRemoveStudentScore(educationIndex, scoreIndex) {
    this.typeCastToFormArray(this.educationFormArray.controls[educationIndex].get('score')).removeAt(scoreIndex);
  }

 // create formArray of education group by looping on education array
  createEducationFormGroup(education?: Education): FormGroup {
    return this.fb.group({
      type: [education ? education.type : null],
      name: [education ? education.name : null],
      location: [education ? education.location : null],
      board: [education ? education.board : null],
      field_of_study: [education ? education.field_of_study : null],
      degree: [education ? education.degree  : null],
      start_year: [ education ? education.start_year : null],
      end_year: [education ? education.end_year : null],
      score: this.createScoreFormArray(education ? education.score : [])
    });
  }

  createScoreFormArray(score: StudentSchoolScore[]): FormArray {
    return this.fb.array(score.length > 0 ? score.map(item => this.addStudentScoreFormGroup(item)) :
    [this.addStudentScoreFormGroup()]);
  }

  addStudentScoreFormGroup(score ?: StudentSchoolScore): FormGroup {
    return this.fb.group({
      class_name: [score ? score.class_name : null ],
      class_score: [score ? score.class_score : null]
    });
  }

  onAddStudentScore(index) {
    this.typeCastToFormArray(this.educationFormArray.controls[index].get('score')).push(this.addStudentScoreFormGroup());
  }

  onAddEducation() {
    this.educationFormArray.push(this.createEducationFormGroup());
  }

  onSubmitForm() {
    this.onSubmitHistoryForm.emit(this.studentHistoryForm.getRawValue());
  }

  ngOnInit() {
    this.historyFormSubscription = this.initHistoryForm().subscribe((form) => {
      this.studentHistoryForm = form;
      this.educationFormArray = this.typeCastToFormArray(this.studentHistoryForm
        .get('student_profile').get('history').get('education'));
    });
    let givenYear = 1980;
    this.years = [];
    const currentYear  = new Date().getFullYear();
    for (let i = givenYear; i < currentYear; i++) {
      givenYear = i + 1;
      this.years.push(givenYear);
    }
  }

  onSelectEductionType(event,index){
    const studentScoreFormArray =   this.typeCastToFormArray(this.educationFormArray.controls[index].get('score'));
    if(event.value == 'College') {
      studentScoreFormArray.at(0).patchValue({
        class_name: 'college'
      });
      for(let i = studentScoreFormArray.controls.length - 1 ; i > 0 ; i--) {
        studentScoreFormArray.removeAt(i);
      }
      studentScoreFormArray.controls[0].get('class_name').disable();
    } else {
      studentScoreFormArray.controls[0].get('class_name').enable();
    }
  }

  ngOnDestroy(): void {
    this.historyFormSubscription.unsubscribe();
    }
}

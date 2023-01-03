import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { KnowYouBetter } from 'src/app/core/models/student-profile.model';

enum Form_Arrays {
  PEOPLE_WHO_INSPIRE_YOU = 'people_who_inspire_you',
  FAVORITE_BOOKS = 'fav_books',
  FAVORITE_MOVIES = 'fav_movies',
  FAVORITE_WEBSITES = 'fav_websites',
  FAVORITE_MESSAGE_SERVICE = 'fav_message_service',
}
@Component({
  selector: 'app-student-know-you-better',
  templateUrl: './student-know-you-better.component.html',
  styleUrls: ['./student-know-you-better.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentKnowYouBetterComponent implements OnInit , OnDestroy {
  panelOpenState = false;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitKnowYouBetterForm = new EventEmitter();
  studentKnowYouBetterForm: FormGroup;
  knowYouBetterFormSubscription: Subscription;
  formArraysEnum = Form_Arrays;
  constructor(
    private staticDataService: StaticDataService,
    private fb: FormBuilder,
  ) {}

  initStudentKnowYouBetterForm() {
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
           know_you_better: this.generateKnowYouBatterForm(apiResponse.student_profile.know_you_better)
          }),
        })
      )
    );
  }

  

  

  generateKnowYouBatterForm(knowYouBetter: KnowYouBetter) {
    return this.fb.group({
      people_who_inspire_you: this.fb.array(
        knowYouBetter.people_who_inspire_you.length > 0 ?
        knowYouBetter.people_who_inspire_you.map((item) =>
              this.addKnowYouBetterFromGroup(item)) : [this.addKnowYouBetterFromGroup()]
      ),
     
      fav_books: this.fb.array(
        knowYouBetter.fav_books.length > 0 ?
        knowYouBetter.fav_books.map(item => this.addKnowYouBetterFromGroup(item)) :
        [this.addKnowYouBetterFromGroup()]
      ),
      fav_movies: this.fb.array(
        knowYouBetter.fav_movies.length > 0 ?
        knowYouBetter.fav_movies.map(item => this.addKnowYouBetterFromGroup(item)) :
        [this.addKnowYouBetterFromGroup()]
      ),
      fav_websites: this.fb.array(
        knowYouBetter.fav_websites.length > 0 ?
        knowYouBetter.fav_websites.map(item => this.addKnowYouBetterFromGroup(item)) :
        [this.addKnowYouBetterFromGroup()]
      ),
      fav_message_service: this.fb.array(
        knowYouBetter.fav_message_service.length > 0 ?
        knowYouBetter.fav_message_service.map(item => this.addKnowYouBetterFromGroup(item)) :
        [this.addKnowYouBetterFromGroup()]
      ),
      fav_activity_on_internet: [knowYouBetter ? knowYouBetter.fav_activity_on_internet: false],
      is_completed: [false]
    });
  }

  addKnowYouBetterFromGroup(object?) {
    return this.fb.group({
      name: [object ? object.name : null]
    });
  }

  typeCastToFormArray(formGroup: AbstractControl) {
    return formGroup as FormArray;
  }

  onRemoveFormGroup(index, formGroup) {
    this.typeCastToFormArray(
      this.studentKnowYouBetterForm.get('student_profile').get('know_you_better').get(formGroup)
    ).removeAt(index);
  }

  onAddFormGroup(formGroup) {
    const length = this.typeCastToFormArray(this.studentKnowYouBetterForm.get('student_profile').get('know_you_better')
    .get(formGroup)).length;
    if (formGroup !== Form_Arrays.FAVORITE_MESSAGE_SERVICE) {
      if (length >= 2 && formGroup !== Form_Arrays.FAVORITE_WEBSITES) {
        return;
      } else if (length > 4) {
        return;
      }
    }
    this.typeCastToFormArray(this.studentKnowYouBetterForm.get('student_profile').get('know_you_better').get(formGroup))
    .push(this.addKnowYouBetterFromGroup());
  }

  onSubmitForm() {
    this.onSubmitKnowYouBetterForm.emit(this.studentKnowYouBetterForm.getRawValue());
  }
  ngOnInit(): void {
    this.knowYouBetterFormSubscription = this.initStudentKnowYouBetterForm().subscribe(form => this.studentKnowYouBetterForm = form);
  }

  ngOnDestroy(): void {
    this.knowYouBetterFormSubscription.unsubscribe();
  }
}

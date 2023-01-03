import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { map, retry } from 'rxjs/operators';
import {
  Geography,
  History,
  WaysToBeInTouch,
  Headed,
  KnowYouBetter,
  Profile,
  Interest,
} from '../models/student-profile.model';
import { group } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { Logger } from './logger.service';
import { ApiResponse } from '../models/general.response';
import { Observable, of } from 'rxjs';
const Logging = new Logger('GenerateProfileFormService');

@Injectable({
  providedIn: 'root',
})
export class GenerateProfileFormService {
  defaultUrl = environment['apiUrl'];
  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) {}

 

  // getStudentProfileForm(studentProfileData) {
  //   let studentJsonData: Observable<FormGroup>;
  //   if (Object.keys(studentProfileData).length > 0) {
  //     studentJsonData = of(studentProfileData);
  //   } else {
  //     studentJsonData = this.http.get<FormGroup>('/assets/form.json');
  //   }
  //   return studentJsonData.pipe(
  //     map((apiResponse: any) =>
  //       this.fb.group({
  //         geography: this.generateGeographyForm(apiResponse.geography),
  //         history: this.generateHistoryForm(apiResponse.history),
  //         ways_to_be_in_touch: this.generateTouchForm(
  //           apiResponse.ways_to_be_in_touch
  //         ),
  //         headed: this.generateHeadedForm(apiResponse.headed),
  //         know_you_better: this.generateKnowYouBatterForm(
  //           apiResponse.know_you_better
  //         ),
  //       })
  //     )
  //   );
  // }

  // getStudentProfileForm(studentProfileData) {
  //   let studentJsonData: Observable<FormGroup>;
  //   if(Object.keys(studentProfileData).length > 0){
  //     studentJsonData = of(studentProfileData);
  //   } else {
  //     studentJsonData = this.http.get<FormGroup>('/assets/form.json');
  //   }
  //   return studentJsonData.pipe((
  //     map((apiResponse: any) => this.fb.group({
  //       student_profile: this.fb.group({
  //       geography: this.generateGeographyForm(apiResponse.student_profile.geography),
  //       history: this.generateHistoryForm(apiResponse.student_profile.history),
  //       ways_to_be_in_touch: this.generateTouchForm(apiResponse.student_profile.ways_to_be_in_touch),
  //       headed: this.generateHeadedForm(apiResponse.student_profile.headed),
  //       interest: this.generateInterestForm(apiResponse.student_profile.interest),
  //       know_you_better: this.generateKnowYouBatterForm(apiResponse.student_profile.know_you_better)
  //       })
  //     }))
  //   ));
  // }

  // generateInterestForm(interest: Interest) {
  //   return this.fb.group({
  //     interest_area: [interest.interest_area]
  //   });
  // }

  // generateKnowYouBatterForm(knowYouBetter: KnowYouBetter) {
  //   return this.fb.group({
  //     people_who_inspire_you: this.fb.array(
  //       knowYouBetter.people_who_inspire_you.length > 0 ?
  //       knowYouBetter.people_who_inspire_you.map((item) =>
  //             this.addKnowYouBetterFromGroup(item)) : [this.addKnowYouBetterFromGroup()]
  //     ),
  //     fav_books: this.fb.array(
  //       knowYouBetter.fav_books.length > 0 ?
  //       knowYouBetter.fav_books.map(item => this.addKnowYouBetterFromGroup(item)) :
  //       [this.addKnowYouBetterFromGroup()]
  //     ),
  //     fav_movies: this.fb.array(
  //       knowYouBetter.fav_movies.length > 0 ?
  //       knowYouBetter.fav_movies.map(item => this.addKnowYouBetterFromGroup(item)) :
  //       [this.addKnowYouBetterFromGroup()]
  //     ),
  //     fav_websites: this.fb.array(
  //       knowYouBetter.fav_websites.length > 0 ?
  //       knowYouBetter.fav_websites.map(item => this.addKnowYouBetterFromGroup(item)) :
  //       [this.addKnowYouBetterFromGroup()]
  //     ),
  //     fav_message_service: this.fb.array(
  //       knowYouBetter.fav_message_service.length > 0 ?
  //       knowYouBetter.fav_message_service.map(item => this.addKnowYouBetterFromGroup(item)) :
  //       [this.addKnowYouBetterFromGroup()]
  //     ),
  //     awards: this.fb.array(
  //       knowYouBetter.awards.length > 0 ?
  //       knowYouBetter.awards.map(item => this.addKnowYouBetterFromGroup(item)) :
  //       [this.addKnowYouBetterFromGroup()]
  //     ),
  //     writing_sample: this.fb.group({
  //       answer_type: [knowYouBetter.writing_sample ? knowYouBetter.writing_sample.answer_type : null],
  //       value: [knowYouBetter.writing_sample ? knowYouBetter.writing_sample.value : null],
  //       thinking_description: [knowYouBetter.writing_sample ? knowYouBetter.writing_sample.thinking_description : null]
  //     }),
  //     any_bpp: this.fb.group({
  //       answer: [knowYouBetter.any_bpp ? knowYouBetter.any_bpp.answer: null],
  //       value: [knowYouBetter.any_bpp ? knowYouBetter.any_bpp.value: null]
  //     }),
  //     fav_activity_on_internet: [],
  //     describe_any_project: [],
  //     letter_of_recommendation: [],
  //     someone_said_something: [],
  //     is_completed: [false]
  //   });
  // }

  // addStudentTest(testInfo?) {
  //   return this.fb.group({
  //     test_name: [testInfo ? testInfo.test_name : null],
  //     test_status: [testInfo ? testInfo.test_status : null],
  //     current_score: [testInfo ? testInfo.current_score : null],
  //     test_date: [testInfo ? testInfo.test_date : null],
  //     other_text: [testInfo ? testInfo.other_text : null]
  //   });
  // }

  // addKnowYouBetterFromGroup(object?) {
  //   return this.fb.group({
  //     name: [object ? object.name : null]
  //   });
  // }

  // addFormGroupButtonClick(formGroup: AbstractControl) {
  //   (formGroup as FormArray).push(this.addKnowYouBetterFromGroup());
  // }

  // addTestButtonClick(formGroup: AbstractControl) {
  //   (formGroup as FormArray).push(this.addStudentTest());
  // }

  // generateHeadedForm(headed: Headed) {
  //   return this.fb.group({
  //     expected_year_to_start: this.fb.group({
  //       grade: [headed.expected_year_to_start ? headed.expected_year_to_start.grade : null],
  //       year: [headed.expected_year_to_start? headed.expected_year_to_start.year : null],
  //     }),
  //     wish_to_study: this.fb.group({
  //       grade: [headed.wish_to_study ? headed.wish_to_study.grade : null],
  //       subjects: [headed.wish_to_study ? headed.wish_to_study.subjects : null],
  //       majors: [headed.wish_to_study ? headed.wish_to_study.majors : null],
  //       other_text: [headed.wish_to_study ? headed.wish_to_study.other_text : null]
  //     }),
  //     preferred_countries: [headed.preferred_countries],
  //     test_info: this.fb.array(
  //       headed.test_info.length > 0 ? headed.test_info.map((item) => this.addStudentTest(item)) :
  //       [this.addStudentTest()]
  //     ),
  //     is_completed: false,
  //   });
  // }

  // addParentDetailFormGroup(parentDetail?) {
  //   return this.fb.group({
  //     name: [parentDetail ? parentDetail.name : null],
  //     email: [parentDetail ? parentDetail.email : null],
  //     relation: [parentDetail ? parentDetail.relation : null],
  //   });
  // }

  // addSchoolCounselorFormGroup(counselor?) {
  //   console.log(counselor);
  //   return this.fb.group({
  //     name: [counselor ? counselor.name :  null],
  //     email: [counselor ? counselor.email : null],
  //   });
  // }

  // generateTouchForm(waysToBeTouch: WaysToBeInTouch) {
  //   return this.fb.group({
  //     phone_number: this.fb.group({
  //       extension: [waysToBeTouch?.phone_number?.extension],
  //       number: [waysToBeTouch?.phone_number?.number],
  //       tag: [waysToBeTouch?.phone_number?.tag],
  //     }),
  //     parents_details: this.fb.array(
  //       waysToBeTouch.parents_details.length > 0 ?
  //        waysToBeTouch.parents_details.map((parentDetail) => this.addParentDetailFormGroup(parentDetail)) :
  //       [this.addParentDetailFormGroup()]
  //     ),
  //     school_counselor: this.fb.array(
  //       waysToBeTouch.school_counselor.length > 0 ? 
  //       waysToBeTouch.school_counselor.map((counselor) => this.addSchoolCounselorFormGroup(counselor)) :
  //        [this.addSchoolCounselorFormGroup()]
  //     ),
  //     is_completed: [waysToBeTouch.is_completed],
  //   });
  // }
  // generateHistoryForm(history: History) {
  //   return this.fb.group({
  //     dob: [history.dob],
  //     grade: [history.grade],
  //     passing_year: [history.passing_year],
  //     is_completed: [history.is_completed],
  //   });
  // }
  // generateGeographyForm(geography: Geography) {
  //   return this.fb.group({
  //     school_clg_name: [geography.school_clg_name],
  //     school_clg_city: [geography.school_clg_city],
  //     citizenship: [geography.citizenship],
  //     country: [geography.country],
  //     city: [geography.city],
  //     state: [geography.state],
  //     is_completed: [geography.is_completed],
  //   });
  // }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Profile } from 'src/app/core/models/student-profile.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  studentOnBoardingForm$: Observable<FormGroup>;
  userId: string;
  studentProfileData$: Observable<Profile>;
  constructor(
    private studentService: StudentService,
    private datePipe: DatePipe,
    private utilService: UtilsService
  ) {}

  submitStudentProfile(profileData) {
    console.log(profileData);
    let formData = profileData;
    if (formData.student_profile.ways_to_be_in_touch && formData.student_profile.ways_to_be_in_touch.dob) {
      formData.student_profile.ways_to_be_in_touch.dob = this.datePipe.transform(
        formData.student_profile.ways_to_be_in_touch.dob,
        'yyyy-MM-dd'
      );
    }

    if (formData.student_profile.history) {
      formData.student_profile.history.education.forEach(education => {
        education.start_year = this.datePipe.transform(education.start_year, 'yyyy');
        education.end_year = this.datePipe.transform(education.end_year, 'yyyy');
      });
    }



    // assign null to other test value when user select test name except other
    if(formData.student_profile.headed) {
      formData.student_profile.headed.test_info.forEach((test) => {
        if (test.test_name !== 'Other') {
          test.other_text = null;
        }
      });
  
      if (formData.student_profile.headed.wish_to_study.subjects != 'Other') {
        formData.student_profile.headed.wish_to_study.other_text = null;
      }
    }
    formData = this.utilService.removeNullFields(formData);
    console.log(formData);
    this.studentService.saveStudentProfile(this.userId, formData).subscribe(
      (profile) => {
        Swal.fire({
          title: 'Successful',
          text: profile.message,
          icon: profile.status,
        });
      },
      (error) => {
        // this.isLoading = false;
        Swal.fire(
          'Failed to update profile',
          error.message || error.error,
          'error'
        );
      }
    );
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.studentProfileData$ = this.studentService.getStudentProfile(
      this.userId
    );
  }

  ngOnDestroy(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UniversityPartnerService } from 'src/app/core/services/university-partner.service';
import Swal from 'sweetalert2';
import { UniversityPartnerProfile, UniversityPartnerProfileObj } from 'src/app/core/models/university-partner-profile.model';

@Component({
  selector: 'app-university-partner-profile',
  templateUrl: './university-partner-profile.component.html',
  styleUrls: ['./university-partner-profile.component.css']
})
export class UniversityPartnerProfileComponent implements OnInit {

  studentSubjects = AppConstants.STUDENT_SUBJECT;
  profileForm: FormGroup;
  isLoading = false;
  universityPartnerTests = AppConstants.UNIVERSITY_PARTNER_TESTS;
  constructor(
    private fb: FormBuilder,
    private utilService: UtilsService,
    private universityPartnerService: UniversityPartnerService) { }

  initProfileGroup(profile: UniversityPartnerProfileObj) {
    this.profileForm = this.fb.group({
        offer_courses: this.fb.group({
          grade: [profile ? profile.offer_courses.grade : null],
          subjects: [profile ? profile.offer_courses.subjects : null],
          majors: [profile ? profile.offer_courses.majors : null]
        }),
        test_required: [profile ? profile.test_required : null],
        scholarships_details: [profile ? profile.scholarships_details : null]
    });
  }

  onSubmit() {
    this.isLoading = true;
    const userId = localStorage.getItem('userId');
    let formData = {};
    // tslint:disable-next-line:no-string-literal
    formData['university_partner_profile'] = Object.assign({}, this.profileForm.getRawValue());
    if(formData['university_partner_profile'].offer_courses.subjects != 'Other') {
      formData['university_partner_profile'].offer_courses.majors = null;
    }
    // formData = this.utilService.removeNullFields(formData);
    this.universityPartnerService.saveProfile(userId,formData).subscribe(
      (profile) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: profile.message,
          icon: profile.status,
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update profile',
          error.message || error.error,
          'error'
        );
      }
    );
  }

  ngOnInit(): void {
    const partnerId = localStorage.getItem('userId');
    this.universityPartnerService.getUniversityPartnerProfile(partnerId).subscribe(profile =>{
      this.initProfileGroup(profile.university_partner_profile);
    })
    
  }

}

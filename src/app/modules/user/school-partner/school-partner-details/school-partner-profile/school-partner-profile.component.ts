import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SchoolPartnerService } from 'src/app/core/services/school-partner.service';
import Swal from 'sweetalert2';
import { SchoolPartnerProfile, SchoolPartnerProfileObj } from 'src/app/core/models/school-partner-profile.model';
import { Countries } from 'src/app/core/models/staticData.model';

@Component({
  selector: 'app-school-partner-profile',
  templateUrl: './school-partner-profile.component.html',
  styleUrls: ['./school-partner-profile.component.css']
})
export class SchoolPartnerProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;
  countries: Countries[];
  constructor(
    private fb: FormBuilder,
    private schoolPartnerService: SchoolPartnerService) {
      this.countries = JSON.parse(localStorage.getItem('countries_data'));
     }

  initProfileGroup(profile: SchoolPartnerProfileObj) {
    this.profileForm = this.fb.group({
      is_interested_in_dev_program: [profile ? profile.is_interested_in_dev_program : null],
      is_enrichment_center: [profile ? profile.is_enrichment_center : null],
      student_with_impact_projects: [profile ? profile.student_with_impact_projects : null],
      countries_for_furthur_studies: [profile ? profile.countries_for_furthur_studies : null]
    })
  }

  onSubmit() {
    console.log("hi",this.profileForm.getRawValue());
    this.isLoading = true;
    const userId = localStorage.getItem('userId');
    let formData = {};
    // tslint:disable-next-line:no-string-literal
    formData['school_partner_profile'] = Object.assign({}, this.profileForm.getRawValue());

    this.schoolPartnerService.saveProfile(userId,formData).subscribe(
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
    this.schoolPartnerService.getSchoolPartnerProfile(partnerId).subscribe(profile =>{
      this.initProfileGroup(profile.school_partner_profile);
    })

  }

}

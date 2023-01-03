import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-impact-partner-profile',
  templateUrl: './impact-partner-profile.component.html',
  styleUrls: ['./impact-partner-profile.component.css']
})
export class ImpactPartnerProfileComponent implements OnInit {

  profileFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  initImpactPartnerProfileFrom() {
    this.profileFormGroup = this.fb.group({
      impact_partner_profile: this.fb.group({
        phone_number: this.fb.group({
          extension: [],
          number: [],
          tag: ['primary']
        }),
        social_media_links: this.fb.array([this.generateFormGroup()]),
        option_for_students: [],
        impact_area: [],
        sdg: []
      })
    })
  }
  generateFormGroup() {
    return this.fb.group({
      name: []
    });
  }

  ngOnInit(): void {
    this.initImpactPartnerProfileFrom();
  }

}

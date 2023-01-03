import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/components/email-state-matcher';
import { AnnouncementService } from 'src/app/core/services/announcement.service';
import { NzModalRef } from 'ng-zorro-antd';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.css']
})
export class NewAnnouncementComponent implements OnInit {

  announcementForm: FormGroup;
  announcementFor: any[] = [];
  id: any;
  mode: String;
  resource : any;

  //show word limit
  wordCount: any;
  words: any;
  wordLimitError: any;
  showWordLimitError: Boolean = false;

  activationOptions = [
    {
      id: 1,
      value: true,
      name: 'Active'
    },
    {
      id: 2,
      value: false,
      name: 'Deactive'
    }
  ];

  announcementTypeOptions = [
    {
      id: 1,
      value: 'project',
      name: 'Project'
    },
    {
      id: 2,
      value: 'feed',
      name: 'Feed'
    }
  ];


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private announcementService: AnnouncementService,
    private modal: NzModalRef,
  ) { 
    this.announcementForm = fb.group({

      'subject': ['',Validators.required],
      'details': ['',Validators.required],
      'announcementType': ['project',Validators.required],
      'forStudents': [true],
      'forMentors': [true],
      'isActive': [true],
    })
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchResource();
    } else {
      // this.isSpinning = false;
    }
  }

  fetchResource() {
    this.announcementService.getAnnouncementById(this.id).subscribe(
      (response) => {
        if (response) {
          this.wordCount = response?.data?.data.details ? response?.data?.data.details.split(/\s+/) : 0;
          this.words = this.wordCount ? this.wordCount.length : 0;
          this.patchForm(response.data);
        }
      },
      (err) => {
      },
      () => {
      }
    );
  }

  patchForm(resource) {
    this.resource = resource;
    
    this.announcementForm.patchValue({
      subject: resource?.data?.subject,
      details: resource?.data?.details,
      announcementType: resource?.data?.announcementType,
      forStudents: resource?.data?.forStudents,
      forMentors: resource?.data?.forMentors,
      isActive: resource?.data?.isActive,
    });
    this.markAllTouched();
  }

  createForm() {
    if (this.mode === Mode.Edit) {
      this.announcementForm = this.fb.group(
        {
          subject: ["", [Validators.required]],
          details: ["", [Validators.required]],
          announcementType: ['project',Validators.required],
          forStudents: [true],
          forMentors: [true],
          isActive: [true],
        },
      );
    }
    else
    {
      this.announcementForm = this.fb.group(
        {
          subject: ["", [Validators.required]],
          details: ["", [Validators.required]],
          announcementType: ['project',Validators.required],
          forStudents: [true],
          forMentors: [true],
          isActive: [true],
        },
      );
    }
     
    this.announcementForm.valueChanges.subscribe(() => {
    });
  }

  onSubmitForm() {
    const formData = this.announcementForm.getRawValue();
    this.makeAnnouncement();
    this.announcementForm.reset();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.announcementForm.valid && (this.words <= 250 || this.words == undefined)) {
        if (this.mode === Mode.Create) {          
          this.announcementService.makeAnnouncement(this.announcementForm.value).subscribe(
            (res) => {
              // this.id = res.data;
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: "Announcement Created Successfully",
                icon: 'success',
              });
            },
            (err) => {
              debugger;
              reject();
              Swal.fire( 
                'Create Announcement failed',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          this.announcementService.updateAnnouncement(this.announcementForm.value, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Updated Announcement Successfully',
                icon: 'success',
              });
              resolve();
            },
            (err) => {
              Swal.fire(
                'Failed to Update',
                'error'
              );
              reject();
            },
            () => {
              reject();
            }
          );
        }
      }
    });
  }

  markAllTouched() {
    for (const i in this.announcementForm.controls) {
      this.announcementForm.controls[i].markAsDirty();
      this.announcementForm.controls[i].updateValueAndValidity();
    }
  }

  cancel() {
    this.modal.destroy();
  }


  makeAnnouncement() {
    const formData = this.announcementForm.getRawValue();

    this.announcementService.makeAnnouncement(formData).subscribe(
      (data) =>
       {
       }
      );
  }

  wordCounter(event) {
    if (event.keyCode != 32) {
      this.wordCount = event.target.value ? event.target.value.split(/\s+/) : 0;
      this.words = this.wordCount ? this.wordCount.length : 0;
    }

    if (this.words > 250) {
      this.showWordLimitError = true;
      this.wordLimitError = 'Max word limit is 250'
    } else {
      this.showWordLimitError = false;
    }
  }

}

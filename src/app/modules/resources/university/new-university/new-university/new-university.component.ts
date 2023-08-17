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
  selector: 'app-new-university',
  templateUrl: './new-university.component.html',
  styleUrls: ['./new-university.component.css']
})
export class NewUniversityComponent implements OnInit {

  universityForm: FormGroup;
  announcementFor: any[] = [];
  id: any;
  mode: String;
  resource : any;
  logoImage: any;
  addDefaultLogo: FormGroup;
  wordCount: any;
  words: any;
  wordLimitError: any;
  showWordLimitError: Boolean = false;
  isSubmitted: boolean = false;

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


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private announcementService: AnnouncementService,
    private modal: NzModalRef,
  ) { 
    this.universityForm = fb.group({

      'subject': ['',Validators.required],
      'details': ['',Validators.required],
      'announcementType': ['project',Validators.required],
      'forStudents': [true],
      'forMentors': [true],
      'isActive': [true],
      'imagePath': ['',Validators.required],
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
    
    this.universityForm.patchValue({
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
      this.universityForm = this.fb.group(
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
      this.universityForm = this.fb.group(
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
     
    this.universityForm.valueChanges.subscribe(() => {
    });
  }

  onSubmitForm() {
    const formData = this.universityForm.getRawValue();
    this.makeAnnouncement();
    this.universityForm.reset();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.universityForm.valid && (this.words <= 250 || this.words == undefined)) {
        if (this.mode === Mode.Create) {          
          this.announcementService.makeAnnouncement(this.universityForm.value).subscribe(
            (res) => {
              // this.id = res.data;
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: "University Created Successfully",
                icon: 'success',
              });
            },
            (err) => {
              debugger;
              reject();
              Swal.fire( 
                'Create University failed',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          this.announcementService.updateAnnouncement(this.universityForm.value, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Updated University Successfully',
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
    for (const i in this.universityForm.controls) {
      this.universityForm.controls[i].markAsDirty();
      this.universityForm.controls[i].updateValueAndValidity();
    }
  }

  cancel() {
    this.modal.destroy();
  }


  makeAnnouncement() {
    const formData = this.universityForm.getRawValue();

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
   uploadFileApi(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('files', file);

      this.http.post(environment.apiEndpointNew+'public/uploadFile', formData)
        .subscribe((res: any) => {
          resolve(res.url);
        }, (err => {
          reject(err);
        }))
    })
  }

  logoUpload(event) {
    var file = event.target.files;
    if(file[0].type == 'image/jpeg' || file[0].type == 'image/png' || file[0].type == 'image/jpg')
    {
      if (event.target.files[0].size/1024/1024 > 10) {
        console.log("The file is too large. Allowed maximum size is 10 MB.")
        return;
      }
      this.uploadFileApi(event.target.files[0]).then((data) => {
        this.logoImage = data;        
      }).catch((err) => {
        console.log("Upload Failed")
      })
    }
    else
    {
      console.log("Allow only .png, .jpeg, .jpg this file")
      return;
    }
     
  }
  public hasErrorEvent = (controlName: string, errorName: string) => { 
    return this.addDefaultLogo.controls[controlName].hasError(errorName);
  };

}

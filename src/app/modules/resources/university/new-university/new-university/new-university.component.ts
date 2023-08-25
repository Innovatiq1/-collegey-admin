import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/components/email-state-matcher';
import { AnnouncementService } from 'src/app/core/services/announcement.service';
import { NzModalRef } from 'ng-zorro-antd';
import { UniversityPartnerNzListingComponent } from 'src/app/modules/user/university-partner-nz/university-partner-nz-listing/university-partner-nz-listing.component';
import { UniversityService } from 'src/app/core/services/university.service';

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
  logoImage1: any;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private announcementService: AnnouncementService,
    private universityService:UniversityService,
    private modal: NzModalRef,
  ) { 
    this.universityForm = fb.group({

      'name': ['',Validators.required],
      'description': ['',Validators.required],
      //'//imagePath': ['',Validators.required],
      'weblink': ['',Validators.required],
      
      
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
    this.universityService.getUniversityById(this.id).subscribe(
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
    //console.log("==esource?.data?.weblink=",resource?.data?.weblink)
    this.logoImage= resource?.data?.imagePath
    //this.logoImage=""
    
    this.universityForm.patchValue({
      name: resource?.data?.name,
      description: resource?.data?.description,
      //imagePath: resource?.data?.imagePath,
      weblink: resource?.data?.weblink
      
      
    });
    console.log("===rrrrrrrrrrrrrrrrrrrrrrs====", this.universityForm.getRawValue())

    this.markAllTouched();
  }

  createForm() {
    if (this.mode === Mode.Edit) {
      this.universityForm = this.fb.group(
        {
      'name': ['',Validators.required],
      'description': ['',Validators.required],
     // 'imagePath': ['',Validators.required],
      'weblink': ['',Validators.required],
      
        },
      );
    }
    else
    {
      this.universityForm = this.fb.group(
        {
      'name': ['',Validators.required],
      'description': ['',Validators.required],
      //'imagePath': ['',Validators.required],
      'weblink': ['',Validators.required],
      
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
      const formData = this.universityForm.getRawValue();
      let des=  formData.description.replace(/<\/?span[^>]*>/g,"")
      const dec1 = des.replace(/<\/?p[^>]*>/g,"")
      let payload ={
        name:formData.name,
        description:dec1,
        weblink:formData.weblink,
        imagePath:this.logoImage,
        isDeleted:true,
        isActivated:true,

      }
      console.log("=======",payload)
      
      //  formData['isDeleted']=true
      //  formData['isActivated']=true

      if (this.universityForm.valid && (this.words <= 250 || this.words == undefined)) {
        if (this.mode === Mode.Create) { 
          console.log("====s===",payload)       
            
          this.universityService.CreateUniversity(payload).subscribe(
            (res) => {
              // this.id = res.data;
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: "University Created Successfully",
                icon: 'success',
              });
              this.logoImage=""
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
          this.universityService.EditUniversity(payload, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Updated University Successfully',
                icon: 'success',
              });
              this.logoImage=""
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
        console.log("========logo=",data)
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

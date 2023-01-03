import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddDefaultBannerService } from 'src/app/core/services/add-default-banner.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-default-banner',
  templateUrl: './add-default-banner.component.html',
  styleUrls: ['./add-default-banner.component.css']
})
export class AddDefaultBannerComponent implements OnInit {

  bannerImage:any;
  addDefaultBanner: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private http: HttpClient,
    private addDefaultBannerService: AddDefaultBannerService,
    private fb: FormBuilder,
    private router: Router,
    private modal: NzModalRef,
    ) {
      this.addDefaultBanner = fb.group({
        'bannerFor': ['',Validators.required],
        'isActivated': ['true',Validators.required],
        'imagePath': ['',Validators.required],
      });
     }

  ngOnInit(): void {

  }

  save() {

    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();     
      if (this.addDefaultBanner.valid) {
        this.isSubmitted = true;
        if (this.addDefaultBanner.invalid) {
          return;
        }
        const formData = this.addDefaultBanner.getRawValue();
        formData['imagePath'] = this.bannerImage;
        this.addDefaultBannerService.addBanner(formData).subscribe(
          (res) => {
            // this.id = res.data;
            this.modal.destroy();
            resolve();
            Swal.fire({
              title: 'Successful',
              text: "Banner created successfully",
              icon: 'success',
            });
          },
          (err) => {
            debugger;
            reject();
            Swal.fire( 
              'Create banner failed',
              'error'
            );
          },
          () => {
            reject(); 
          }
        );
      }
    });
  }

  markAllTouched() {
    for (const i in this.addDefaultBanner.controls) {
      this.addDefaultBanner.controls[i].markAsDirty();
      this.addDefaultBanner.controls[i].updateValueAndValidity();
    }
  }

  cancel() {
    this.modal.destroy();
  }


  public hasErrorEvent = (controlName: string, errorName: string) => { 
    return this.addDefaultBanner.controls[controlName].hasError(errorName);
  };

  addBanner(formObj):any {
    return new Promise((resolve, reject) => {
      this.addDefaultBannerService.addBanner(formObj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: 'Banner Added Successfully',
            icon: 'success',
          });
          if(formObj.bannerFor == 'profile')
          {
            this.router.navigate(['/users/profile-banner']);
          }
          if(formObj.bannerFor == 'mentor')
          {
            this.router.navigate(['/users/mentor-banner']);
          }
          if(formObj.bannerFor == 'student')
          { 
            this.router.navigate(['/users/student-banner']);
          }
        },
        (error) => {
       
          Swal.fire(
            'Failed to Add banner',
            error.message || error.error,
            'error'
          );
         reject(error)
        }
      );
    })
    
  }

  onSubmitForm() {
      this.isSubmitted = true;
      if (this.addDefaultBanner.invalid) {
        return;
      }
      const formData = this.addDefaultBanner.getRawValue();
      this.addBanner(formData)
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

  bannerUpload(event) {
    var file = event.target.files;
    if(file[0].type == 'image/jpeg' || file[0].type == 'image/png' || file[0].type == 'image/jpg')
    {
      if (event.target.files[0].size/1024/1024 > 10) {
        console.log("The file is too large. Allowed maximum size is 10 MB.")
        return;
      }
      this.uploadFileApi(event.target.files[0]).then((data) => {
        this.bannerImage = data;        
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
  

}

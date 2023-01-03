import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { MeetOurTeamService } from 'src/app/core/services/meet-our-team.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {

  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;
  teamForm:FormGroup;

  selectFile: any;

  constructor(
    private fb: FormBuilder,
    private motService: MeetOurTeamService,

    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialize(); 
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit)
    {
      this.fetchUpdated();
    }
    else 
    {
    }
  }

  createForm() {
    this.teamForm = this.fb.group(
      {
        name: [null, Validators.required],
        designation: [null, Validators.required],
        description: [null, Validators.required],
        lindkin: [null, Validators.required],
        // image: [null, Validators.required],
        position: [null, Validators.required],
        active: [null, Validators.required],
      },
    );
    this.teamForm.valueChanges.subscribe(() => {
    });
  }

  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  
  patchForm(pageContent) {   
    this.pageContent = pageContent;
    
    this.teamForm.patchValue({
      name: pageContent?.name,
      designation: pageContent?.designation,
      description: pageContent?.description,
      lindkin: pageContent?.lindkin,
      image: pageContent?.image,
      position: pageContent?.position,
      active: pageContent?.active,
    });
    this.selectFile = pageContent?.image;
    this.markAllTouched();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.teamForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.teamForm.value;
          obj['selectFile'] = this.selectFile;
          this.motService.createTeamMember(obj).subscribe(
            (res) => {
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: res.message,
                icon: 'success',
              });
            },
            (err) => {
              debugger;
              reject();
              Swal.fire( 
                'Add data faild',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          let obj = this.teamForm.value;
          obj['selectFile'] = this.selectFile;
          
          this.motService.updateTeamMember(obj,this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
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

  cancel() {
    this.modal.destroy();
  }

  markAllTouched() {
    for (const i in this.teamForm.controls) {
      this.teamForm.controls[i].markAsDirty();
      this.teamForm.controls[i].updateValueAndValidity();
    }
  }

  //file Upload

  onFileUpload(event) {
    var currentName = event.target.files[0].name;
    this.uploadFileApi(event.target.files[0]).then((data) => {
      this.selectFile = data;      
    }).catch((err) => {      
      Swal.fire(
        'file upload faild',
        'error'
      );
    })
  }
  uploadFileApi(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('files', file);      
      this.http.post(environment.apiEndpointNew + 'public/uploadCustAdminFile', formData)
        .subscribe((res: any) => {
          resolve(res);
        }, (err => {          
          reject(err);
        }))
    })
  }

  imagePathS3(imageName, commonImage?){
    return imageName ? `${environment.filesPath}${imageName}` : commonImage;
  }

}

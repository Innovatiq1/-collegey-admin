import { Component, OnInit, NgModule, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { resolve } from 'dns';
import { NzModalRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-mentorfile',
  templateUrl: './add-mentorfile.component.html',
  styleUrls: ['./add-mentorfile.component.css']
})
export class AddMentorfileComponent implements OnInit {

  resourceForm: FormGroup;
  mode: String;
  id: any; 
  resource : any;
  mentorFile:any;
  mentorFiletype: any;
  mentorFilename: any;
  responseData: any;
  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
    private http: HttpClient
  ){ }

  ngOnInit(): void {
    this.initialize();
    this.getMentorFileList('');
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      //this.fetchResource();
    } else {
      // this.isSpinning = false;
    }
  }

  getMentorFileList(filters) {
    this.mentorService.getMentorFileList(filters).subscribe( response =>{
      this.responseData = response?.data?.docs;
    }, error => {
  
    });
  }

  createForm() {
    this.resourceForm = this.fb.group(
      {
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
      },
    );
    this.resourceForm.valueChanges.subscribe(() => {
    });
  }

  uploadFileApi(file) { 
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('files', file);
      this.mentorFilename = file.name;
      this.mentorFiletype = file.type;
      this.http.post(environment.apiEndpointNew+'public/uploadCustAdminFile', formData)
        .subscribe((res: any) => {
          resolve(res.url);
        }, (err => {
          reject(err);
        }))
    })
  }

  onFileUpload(event) {
    var currentName = event.target.files[0].name;
    if (this.responseData.filter(({ fileName }) => currentName == fileName).length) {
      Swal.fire( 
        'file already uploaded.',
        'error'
      ); 
    } else {
      this.uploadFileApi(event.target.files[0]).then((data) => {
        this.mentorFile = data;
      }).catch((err) => {
        Swal.fire( 
         'file upload faild',
         'error'
        );
      })
    } 
  }


  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.resourceForm.valid) {
        if (this.mode === Mode.Create) {
          this.resourceForm.value.mentorFile = this.mentorFile;
          this.resourceForm.value.mentorFiletype = this.mentorFiletype;
          this.resourceForm.value.mentorFilename = this.mentorFilename;
          this.mentorService.createMentorFile(this.resourceForm.value).subscribe(
            (res) => {
              this.id = res._id;
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
                'Add file faild',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          this.resourceForm.value.articleImage = this.mentorFile;
          this.mentorService.updateMentorArticle(this.resourceForm.value, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update article Succesfully',
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
    for (const i in this.resourceForm.controls) {
      this.resourceForm.controls[i].markAsDirty();
      this.resourceForm.controls[i].updateValueAndValidity();
    }
  }


}

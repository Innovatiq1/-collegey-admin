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
import { StudentService } from 'src/app/core/services/student/student.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-add-student-file',
  templateUrl: './add-student-file.component.html',
  styleUrls: ['./add-student-file.component.css']
})
export class AddStudentFileComponent implements OnInit {

  resourceForm: FormGroup;
  mode: String;
  id: any; 
  resource : any;
  studentFile:any;
  studentFiletype: any;
  studentFilename: any;

  responseFileData:any;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getStudentFileList('');
  }

  getStudentFileList(filters) {
    this.studentService.getStudentFileList(filters).subscribe( response =>{
      this.responseFileData  = response?.data?.docs;
    }, error => {
      
    });
  }


  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      //this.fetchResource();
    } else {
      // this.isSpinning = false;
    }
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
      this.studentFilename = file.name;
      this.studentFiletype = file.type;
      this.http.post(environment.apiEndpointNew+'public/uploadFile', formData)
        .subscribe((res: any) => {
          resolve(res.url);
        }, (err => {
          reject(err);
        }))
    })
  }

  onFileUpload(event) {
    var currentName = event.target.files[0].name;
    if (this.responseFileData.filter(({ fileName }) => currentName == fileName).length) {
      Swal.fire( 
        'file already uploaded.',
        'error'
      ); 
    }
    else
    {
      this.uploadFileApi(event.target.files[0]).then((data) => {
        this.studentFile = data;
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
          this.resourceForm.value.studentFile = this.studentFile;
          this.resourceForm.value.studentFiletype = this.studentFiletype;
          this.resourceForm.value.studentFilename = this.studentFilename;
          this.studentService.createStudentFile(this.resourceForm.value).subscribe(
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
          this.resourceForm.value.articleImage = this.studentFile;
          this.studentService.updateStudentArticle(this.resourceForm.value, this.id).subscribe(
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

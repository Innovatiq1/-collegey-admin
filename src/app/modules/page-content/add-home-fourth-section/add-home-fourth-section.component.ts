import { Component, OnInit } from '@angular/core';
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
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { resolve } from 'dns';
import { NzModalRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

// Load Services
import { PageContentService } from 'src/app/core/services/home-service/page-content.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-home-fourth-section',
  templateUrl: './add-home-fourth-section.component.html',
  styleUrls: ['./add-home-fourth-section.component.css']
})
export class AddHomeFourthSectionComponent implements OnInit {

  pageContentForm: FormGroup;
  mode: String;
  id: any;
  itemData: any; 
  selectFile:any;
  pageContent : any;
  constructor(
    private fb: FormBuilder,
    private pageContentService: PageContentService,
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
  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {
    this.pageContent = pageContent;
    this.pageContentForm.patchValue({
      title: pageContent?.title,
      subtitle: pageContent?.subtitle,
      status: pageContent?.status,
    });
    this.selectFile = pageContent?.imagePath;
    this.markAllTouched();
  }
  
  createForm() {
    this.pageContentForm = this.fb.group(
      {
        title: ["", [Validators.required]],
        subtitle: ["", [Validators.required]],
        status: ["", [Validators.required]],
      },
    );
    this.pageContentForm.valueChanges.subscribe(() => {
    });
  }
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
      this.http.post(environment.apiEndpointNew+'public/uploadCustAdminFile', formData)
        .subscribe((res: any) => {
          resolve(res.url);
        }, (err => {
          reject(err);
        }))
    })
  }
  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.pageContentForm.valid) {

        if (this.mode === Mode.Create) {
          let obj = this.pageContentForm.value;
          obj['insertaction'] = 'home_fourth_section';
          obj['selectFile']   = this.selectFile;
          this.pageContentService.createHomepageContent(obj).subscribe(
            (res) => {
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successfull',
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
          let obj = this.pageContentForm.value;
          obj["dataindex"] = this.id;
          obj['insertaction'] = 'home_fourth_section';
          obj['selectFile']   = this.selectFile;
          this.pageContentService.updateHomepageContent(obj,this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successfull',
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
    for (const i in this.pageContentForm.controls) {
      this.pageContentForm.controls[i].markAsDirty();
      this.pageContentForm.controls[i].updateValueAndValidity();
    }
  }
}

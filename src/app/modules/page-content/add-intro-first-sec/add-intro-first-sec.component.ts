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
import { PageContentService } from 'src/app/core/services/home-service/page-content.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-intro-first-sec',
  templateUrl: './add-intro-first-sec.component.html',
  styleUrls: ['./add-intro-first-sec.component.css']
})
export class AddIntroFirstSecComponent implements OnInit {

  pageContentForm: FormGroup;
  pageContentForm1: FormGroup;
  mode: String;
  type: any;
  id: any;
  itemData: any;
  pageContent: any;
  formType: boolean = true;
  selectFile: any;

  constructor(
    private fb: FormBuilder,
    private pageContentService: PageContentService,
    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (this.type === 'subTitle') {
      this.formType = false
    }
    this.initialize();

  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchUpdated();
    } else {

    }
  }

  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {
    this.pageContent = pageContent;    
    if (this.formType) {
      this.pageContentForm1.patchValue({
        title: pageContent?.mainTitle,
      });
      this.selectFile = pageContent?.backgroundImg;
    } else {
      this.pageContentForm.patchValue({
        title: pageContent?.title,
        status: pageContent?.status,
        description: pageContent?.description,
      });
    }
    this.markAllTouched();
  }

  createForm() {
    this.pageContentForm = this.fb.group(
      {
        title: ["", [Validators.required]],
        status: ["", [Validators.required]],
        description: ["", [Validators.required]],
      },
    );
    this.pageContentForm.valueChanges.subscribe(() => {
    });
    this.pageContentForm1 = this.fb.group(
      {
        title: ["", [Validators.required]],
      },
    );
    this.pageContentForm1.valueChanges.subscribe(() => {
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
      this.http.post(environment.apiEndpointNew + 'public/uploadCustAdminFile', formData)
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

      if (this.formType) {
        if (this.pageContentForm1.valid) {

          if (this.mode === Mode.Create) {
            let obj = this.pageContentForm1.value;
            obj['insertaction'] = 'home_second_section';
            obj['selectFile'] = this.selectFile;
            obj["dataindex"] = this.id;
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
            let obj = this.pageContentForm1.value;
            obj["dataindex"] = this.id;
            obj['insertaction'] = 'home_second_section';
            obj['selectFile'] = this.selectFile;
            this.pageContentService.updateHomepageContent(obj, this.id).subscribe(
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
      } else {

        if (this.pageContentForm.valid) {

          if (this.mode === Mode.Create) {
            let obj = this.pageContentForm.value;
            obj['insertaction'] = 'home_second_section_subTitle';
            this.pageContentService.createHomepageContent(obj).subscribe(
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
            let obj = this.pageContentForm.value;
            obj["dataindex"] = this.id;
            obj['insertaction'] = 'home_second_section_subTitle';
            this.pageContentService.updateHomepageContent(obj, this.id).subscribe(
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

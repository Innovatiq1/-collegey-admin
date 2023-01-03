import {
  Component,
  OnInit,
  NgModule,
  Inject,
  EventEmitter,
} from '@angular/core';
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
  Edit = 'Edit',
}

@Component({
  selector: 'app-add-mentor-resource-title',
  templateUrl: './add-mentor-resource-title.component.html',
  styleUrls: ['./add-mentor-resource-title.component.css'],
})
export class AddMentorResourceTitleComponent implements OnInit {
  resourceForm: FormGroup;
  mode: String;
  data: any;
  resource: any;
  articleImage: any;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      // this.fetchResource();
      this.patchForm();
    } else {
      // this.isSpinning = false;
    }
  }

  // fetchResource() {
  //   let obj = { id: this.id };
  //   this.mentorService.getMentorArticleInfo(obj).subscribe(
  //     (response) => {
  //       if (response) {
  //         this.patchForm(response);
  //       }
  //     },
  //     (err) => {},
  //     () => {}
  //   );
  // }

  patchForm() {
    this.resource = this.data;
    // console.log('resource=====', resource);

    this.resourceForm.patchValue({
      mentorResourcesTitle: this.data?.mentorResourcesTitle,
      mentorFavoriteArticlesTitle: this.data?.mentorFavoriteArticlesTitle,
      mentorCuratedRsourcesTitle: this.data?.mentorCuratedRsourcesTitle,
      mentorResourceFileTitle: this.data?.mentorResourceFileTitle,
      studentResourcesTitle: this.data?.studentResourcesTitle,
      studentFavoriteArticlesTitle: this.data?.studentFavoriteArticlesTitle,
      studentCuratedRsourcesTitle: this.data?.studentCuratedRsourcesTitle,
      studentResourceFileTitle: this.data?.studentResourceFileTitle,
    });
    this.markAllTouched();
  }

  createForm() {
   
      this.resourceForm = this.fb.group({
        mentorResourcesTitle: ['', [Validators.required]],
        mentorFavoriteArticlesTitle: ['', [Validators.required]],
        mentorCuratedRsourcesTitle: ['', [Validators.required]],
        mentorResourceFileTitle: ['', [Validators.required]],
        studentResourcesTitle: ['', [Validators.required]],
        studentFavoriteArticlesTitle: ['', [Validators.required]],
        studentCuratedRsourcesTitle: ['', [Validators.required]],
        studentResourceFileTitle: ['', [Validators.required]],
      });

    this.resourceForm.valueChanges.subscribe(() => {});
  }

  // uploadFileApi(file) {
  //   return new Promise((resolve, reject) => {
  //     let formData = new FormData();
  //     formData.append('files', file);
  //     this.http.post(environment.apiEndpointNew+'public/uploadFile', formData)
  //       .subscribe((res: any) => {
  //         resolve(res.url);
  //       }, (err => {
  //         reject(err);
  //       }))
  //   })
  // }

  // onFileUpload(event) {
  //    this.uploadFileApi(event.target.files[0]).then((data) => {
  //      this.articleImage = data;
  //    }).catch((err) => {
  //      Swal.fire(
  //       'Image upload faild',
  //       'error'
  //     );
  //    })
  // }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.resourceForm.valid) {
        if (this.mode === Mode.Create) {
          let formData = this.resourceForm.getRawValue();
          this.mentorService.createMentorResourceTitle(formData).subscribe(
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
              Swal.fire('Add article faild', 'error');
            },
            () => {
              reject();
            }
          );
        } else {
          let formEditData = this.resourceForm.getRawValue();
          this.mentorService
            .updateMentorResourceTitle(formEditData)
            .subscribe(
              (res) => {
                Swal.fire({
                  title: 'Successful',
                  text: 'Updated resources title successfully',
                  icon: 'success',
                });
                resolve();
              },
              (err) => {
                Swal.fire('Failed to Update', 'error');
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

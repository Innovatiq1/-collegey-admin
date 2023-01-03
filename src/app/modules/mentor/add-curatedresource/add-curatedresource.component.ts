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
  selector: 'app-add-curatedresource',
  templateUrl: './add-curatedresource.component.html',
  styleUrls: ['./add-curatedresource.component.css']
})
export class AddCuratedresourceComponent implements OnInit {
  resourceForm: FormGroup;
  mode: String;
  id: any; 
  resource : any;
  articleImage:any;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchResource();
    } else {
      this.resourceForm.patchValue({
        external_link: 'https://www.',
      });
    }
  }

  fetchResource() {
    let obj = {id:this.id}
    this.mentorService.getMentorCuratedInfo(obj).subscribe(
      (response) => {
        if (response) {
          this.patchForm(response);
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
    this.articleImage = resource?.data?.image;
    this.resourceForm.patchValue({
      title: resource?.data?.title,
      shortdescription: resource?.data?.shortdescription,
    });
    this.markAllTouched();
  }

  createForm() {
    var urlRE= new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
    if (this.mode === Mode.Edit) {
      this.resourceForm = this.fb.group(
        {
          title: ["", [Validators.required]],
          external_link: [""],
          shortdescription: ["", [Validators.required]],
        },
      );
    }
    else
    {
      this.resourceForm = this.fb.group(
        {
          title: ["", [Validators.required]],
          external_link: ["", [Validators.required, Validators.pattern(urlRE)]],
          shortdescription: [""],
        },
      );
    }
     
    this.resourceForm.valueChanges.subscribe(() => {
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.resourceForm.valid) {
        if (this.mode === Mode.Create) {
          this.resourceForm.value.articleImage = this.articleImage;
          this.mentorService.createCuratedresources(this.resourceForm.value).subscribe(
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
                'Add curated resource faild',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          this.resourceForm.value.articleImage = this.articleImage;
          this.mentorService.updateCuratedresources(this.resourceForm.value, this.id).subscribe(
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

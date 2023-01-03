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
import { ProjectService } from 'src/app/core/services/project.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-project-fees',
  templateUrl: './add-project-fees.component.html',
  styleUrls: ['./add-project-fees.component.css']
})
export class AddProjectFeesComponent implements OnInit {

  projectFeesForm: FormGroup;
  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
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
    this.projectFeesForm.patchValue({
      title: pageContent?.title,
      fees_type: pageContent?.fees_type,
      default_price: pageContent?.default_price,
      maximum_price: pageContent?.maximum_price,
      minimum_price: pageContent?.minimum_price,
    });
    this.markAllTouched();
  }

  createForm() {
    this.projectFeesForm = this.fb.group(
      {
        title: [""],
        fees_type: [""],
        default_price: ["", [Validators.required]],
        maximum_price: ["", [Validators.required]],
        minimum_price: ["", [Validators.required]],
      },
    );
    this.projectFeesForm.valueChanges.subscribe(() => {
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.projectFeesForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.projectFeesForm.value;
          this.projectService.createProjectFeesData(obj).subscribe(
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
          let obj = this.projectFeesForm.value;
          this.projectService.updateProjectFeesData(obj,this.id).subscribe(
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
    for (const i in this.projectFeesForm.controls) {
      this.projectFeesForm.controls[i].markAsDirty();
      this.projectFeesForm.controls[i].updateValueAndValidity();
    }
  }

}

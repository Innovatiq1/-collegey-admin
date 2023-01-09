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
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/core/models/blog.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { PipeModule } from 'src/app/shared/pipe.module';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { resolve } from 'dns';
import { NzModalRef } from 'ng-zorro-antd';
import { Mentor } from 'src/app/core/models/mentor';
import { UserService } from 'src/app/core/services/user.service';
enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-add-alluser',
  templateUrl: './add-alluser.component.html',
  styleUrls: ['./add-alluser.component.css']
})
export class AddAlluserComponent implements OnInit {
  submitted:boolean=false;
  isLoading = false;
  mode: String;
  id: any;
  blogFormGroup: FormGroup;
  mentor: Mentor;
  documentList = [];
  authorImageList = [];
  imageSource = ImageSource;
  public ClassicEditorBuild = ClassicEditorBuild;
  public editor: CKEditor5.Editor = null;
  public readyEmitter = new EventEmitter<CKEditor5.Editor>();
  editorConfig : CKEditor5.Config = function( config ) {

};
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAlluserComponent>,
    private userService: UserService,
    private commonService: CommonService,
    private modal: NzModalRef,
  ) {
  }

  initBlogForm() {
    this.blogFormGroup = this.fb.group({
      name: [this.mentor ? this.mentor.name : null, [Validators.required]],
      qualification: [this.mentor ? this.mentor.qualification : null, [Validators.required]],
      email: [this.mentor ? this.mentor.email : null, [Validators.required]],
      password: [this.mentor ? this.mentor.password : null, [Validators.required]],
      // phone_number: [this.mentor ? this.mentor.phone_number : null, [Validators.required]],
      status: [this.mentor ? (this.mentor.Active = this.mentor.Active === true ? true : false) : null],
    });

  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmitForm() {
    this.submitted=true;
    return new Promise<void>((resolve, reject) => {
      this.blogFormGroup.markAllAsTouched();
      if (this.blogFormGroup.invalid) {
        return;
      }
      const formData = this.blogFormGroup.getRawValue();
      formData["phone_number"] = [];
    
      if (formData.status) {
        formData.status = 1;
      } else {
        formData.status = 2;
      }
      this.isLoading = true;
      return !this.mentor ? this.addBlog(formData).then((response)=>{
        resolve()
      }).catch((e)=>{
        reject();
      }) : this.updateBlog(formData).then((response)=>{
        resolve()
      }).catch((e)=>{
        reject()
      });
    })
    
  }

  addBlog(formObj):any {
    return new Promise((resolve, reject) => {
      this.userService.saveUsers(formObj).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User created succesfully',
            icon: 'success',
          });
          resolve(response)
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to create user',
            error.message || error.error,
            'error'
          );
         reject(error)
        }
      );
    })
    
  }

  updateBlog(obj):any {
    return new Promise((resolve, reject) => {
      this.userService.updateUsers(obj, this.mentor._id).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User updated succesfully',
            icon: 'success',
          }).then(() => {
             resolve(response);
          });
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update user',
            error.message || error.error,
            'error'
          );
          reject(error)
        }
      );
    })
    
  }

  cancel() {
    this.modal.destroy();
  }

  ngOnInit(): void {
    this.initBlogForm();
  
  }
}

@NgModule({
  declarations: [AddAlluserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PipeModule,
  ],
})
class AddParentsModule {}
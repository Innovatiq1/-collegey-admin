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

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  submitted:boolean=false
  isLoading = false;
  mode: String;
  id: any;
  blogFormGroup: FormGroup;
  blog: Blog;
  documentList = [];
  authorImageList = [];
  imageSource = ImageSource;
  public ClassicEditorBuild = ClassicEditorBuild;
  public editor: CKEditor5.Editor = null;
  public readyEmitter = new EventEmitter<CKEditor5.Editor>();
  editorConfig : CKEditor5.Config = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];
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
    private dialogRef: MatDialogRef<AddBlogComponent>,
    private blogsService: BlogsService,
    private commonService: CommonService,
    private modal: NzModalRef,
  ) {
  }

  initBlogForm() {
    this.blogFormGroup = this.fb.group({
      title: [this.blog ? this.blog.title : null, [Validators.required]],
      short_description: [this.blog ? this.blog.short_description : null, [Validators.required]],
      description: [this.blog ? this.blog.description : null, [Validators.required]],
      author: [this.blog ? this.blog.author : null, [Validators.required]],
      tags: [this.blog ? this.blog.tags : null, [Validators.required]],
      is_paid: [this.blog ? this.blog.is_paid : false],
      cost: [this.blog ? this.blog.cost : null],
      status: [this.blog ? (this.blog.status = this.blog.status === 1 ? true : false) : null],
      // editorPick: [this.blog ? (this.blog.editorPick ? this.blog.editorPick : false) : null],
      image: [this.blog ? this.blog.image : null],
      author_image: [this.blog ? this.blog.author_image : null]
    });
    if (this.blog?.image) {
      this.documentList.push(this.blog.image);
    }
    if(this.blog?.author_image) {
      this.authorImageList.push(this.blog.author_image);
    }
  }

  public onReady( editor: CKEditor5.Editor ) {
    this.editor = editor;
    this.readyEmitter.emit( this.editor );
  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    if(list.length > 0) {
      this.blogFormGroup.patchValue({
        image: list[0],
      });
    } else {
      this.blogFormGroup.patchValue({
        image: null,
      });
    }
  }

  onAuthorImageUpload(list) {
    if(list.length > 0) {
      this.blogFormGroup.patchValue({
        author_image: list[0],
      });
    } else {
      this.blogFormGroup.patchValue({
        author_image: null,
      });
    }
    
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmitForm() {
    this.submitted=true
    return new Promise<void>((resolve, reject) => {
      this.blogFormGroup.markAllAsTouched();
      if (this.blogFormGroup.invalid) {
        return;
      }
      const formData = this.blogFormGroup.getRawValue();
      const tags = [];
      formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags;
      if (formData.status) {
        formData.status = 1;
      } else {
        formData.status = 2;
      }
      this.isLoading = true;
      return !this.blog ? this.addBlog(formData).then((response)=>{
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
      this.blogsService.createBlog(formObj).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'Blog created succesfully',
            icon: 'success',
          });
          // this.dialogRef.close(response);
          resolve(response)
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to create blog',
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
      this.blogsService.updateBlog(obj, this.blog._id).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'Blog updated succesfully',
            icon: 'success',
          }).then(() => {
            // this.dialogRef.close(response);
             resolve(response);
          });
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update blog',
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
    this.blogFormGroup.get('is_paid').valueChanges.subscribe((value) => {
      if (value) {
        this.blogFormGroup.get('cost').setValidators(Validators.required);
        this.blogFormGroup.updateValueAndValidity();
      }
    });
  }
}

@NgModule({
  declarations: [AddBlogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PipeModule,
  ],
})
class AddBlogModule {}

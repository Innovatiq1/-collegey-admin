import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import Swal from 'sweetalert2';

// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service';
import { MentorPerks } from 'src/app/core/models/mentor';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-mentorperks',
  templateUrl: './add-mentorperks.component.html',
  styleUrls: ['./add-mentorperks.component.css']
})
export class AddMentorperksComponent implements OnInit {
  submitted:boolean=false;
  perksForm: FormGroup;
  mode: String;
  id: any; 
  perks : any;
  mentorPerks : MentorPerks
  isLoading = false; 
  show_loader: boolean = false;
  parkFeatured:any = ['No','Yes'];

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

 
  documentList = [];
  imageSource = ImageSource; 
  imgName: any;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
  ){ } 

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchPerks();
    } else {
      // this.isSpinning = false;
    }
  }

  fetchPerks() {
    let obj = {id:this.id}
    this.mentorService.getMentorPerksInfo(obj).subscribe(
      (response) => {
        if (response) {
          this.imgName = response?.data?.image;
          this.patchForm(response);
        }
      },
      (err) => {
      },
      () => {
      }
    );
  }

  patchForm(perks) {
    this.perks = perks;
    this.perksForm.patchValue({
      title: perks?.data?.title,
      featured: perks?.data?.featured,
      short_description: perks?.data?.short_description,
      description: perks?.data?.description,
      tags: perks?.data?.tags,
      image: perks?.data?.image,
    });
    this.markAllTouched();
  }

  createForm() {
    this.perksForm = this.fb.group(
      { 
        title: [this.mentorPerks ? this.mentorPerks.title : null, [Validators.required]],
        featured: ['No'],
        short_description: [this.mentorPerks ? this.mentorPerks.short_description : null, [Validators.required]],
        description: [this.mentorPerks ? this.mentorPerks.description : null, [Validators.required]], 
        tags: [this.mentorPerks ? this.mentorPerks.tags : null, [Validators.required]],  
        image: [this.mentorPerks ? this.mentorPerks.image : null]
      },
    );
    
    if (this.mentorPerks?.image) {
      this.documentList.push(this.mentorPerks.image);
    } 
    this.perksForm.valueChanges.subscribe(() => {
      
    });
  }
 

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    if(list.length > 0) {
      this.perksForm.patchValue({
        image: list[0],
      });
    } else {
      this.perksForm.patchValue({
        image: null,
      });
    }
  }
 
  save() {
    this.submitted=true
    return new Promise<void>((resolve, reject) => {
      this.perksForm.markAllAsTouched();
      if (this.perksForm.invalid) {
        return;
      }
      const formData = this.perksForm.getRawValue();
      const tags = [];
      formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags; 

      if (this.perksForm.valid) {
        this.isLoading   = true;
        this.show_loader = true;

        if (this.mode === Mode.Create) {
          this.mentorService.createMentorPerks(formData).subscribe(
            (res) => {
              this.show_loader       = false;
              this.isLoading         = false;
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
              this.show_loader       = false;
              this.isLoading         = false;
              debugger;
              reject();
              Swal.fire( 
                'Add perks faild',
                'error'
              );
            },
            () => {
              reject();
            }
          );
        } else {
        //  console.log(formData);
          this.mentorService.updateMentorPerks(formData, this.id).subscribe(
            (res) => {
              this.show_loader       = false;
              this.isLoading         = false;
              Swal.fire({
                title: 'Successful',
                text: 'Update Perks Succesfully',
                icon: 'success',
              });
              resolve();
            },
            (err) => {
              this.show_loader       = false;
              this.isLoading         = false;
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
    for (const i in this.perksForm.controls) {
      this.perksForm.controls[i].markAsDirty();
      this.perksForm.controls[i].updateValueAndValidity();
    }
  }


}

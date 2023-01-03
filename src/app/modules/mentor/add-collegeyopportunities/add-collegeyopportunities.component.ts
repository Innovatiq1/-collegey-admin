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
import { CollegeyOpportunities } from 'src/app/core/models/mentor';



enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-collegeyopportunities',
  templateUrl: './add-collegeyopportunities.component.html',
  styleUrls: ['./add-collegeyopportunities.component.css']
})
export class AddCollegeyopportunitiesComponent implements OnInit {
  submitted:boolean = false;
  collegeyOpportunitiesForm: FormGroup;
  mode: String;
  id: any; 
  collegeyOpportunities : CollegeyOpportunities
  isLoading = false; 
  show_loader: boolean = false;
  collegyFeatured:any = ['No','Yes'];

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
      this.fetchCollegeyOpportunities();
    } else {
      // this.isSpinning = false;
    }
  }

  fetchCollegeyOpportunities() {
    let obj = {id:this.id}
    this.mentorService.getCollegeyOpportunitiesInfo(obj).subscribe(
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

  patchForm(collegeyOpportunities) {
    this.collegeyOpportunities = collegeyOpportunities;
    this.collegeyOpportunitiesForm.patchValue({
      title: collegeyOpportunities?.data?.title,
      featured: collegeyOpportunities?.data?.featured,
      short_description: collegeyOpportunities?.data?.short_description,
      description: collegeyOpportunities?.data?.description,
      tags: collegeyOpportunities?.data?.tags,
      image: collegeyOpportunities?.data?.image,
    });
    this.markAllTouched();
  }

  createForm() {
    this.collegeyOpportunitiesForm = this.fb.group(
      { 
        title: [this.collegeyOpportunities ? this.collegeyOpportunities.title : null, [Validators.required]],
        featured: ['No'],
        short_description: [this.collegeyOpportunities ? this.collegeyOpportunities.short_description : null, [Validators.required]],
        description: [this.collegeyOpportunities ? this.collegeyOpportunities.description : null, [Validators.required]], 
        tags: [this.collegeyOpportunities ? this.collegeyOpportunities.tags : null, [Validators.required]],  
        image: [this.collegeyOpportunities ? this.collegeyOpportunities.image : null]
      },
    );
    
    if (this.collegeyOpportunities?.image) {
      this.documentList.push(this.collegeyOpportunities.image);
    } 
    this.collegeyOpportunitiesForm.valueChanges.subscribe(() => {
      
    });
  }
 

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    if(list.length > 0) {
      this.collegeyOpportunitiesForm.patchValue({
        image: list[0],
      });
    } else {
      this.collegeyOpportunitiesForm.patchValue({
        image: null,
      });
    }
  }
 
  save() {
    this.submitted= true;
    return new Promise<void>((resolve, reject) => {
      this.collegeyOpportunitiesForm.markAllAsTouched();
      if (this.collegeyOpportunitiesForm.invalid) {
        return;
      }
      const formData = this.collegeyOpportunitiesForm.getRawValue();
      const tags = [];
      formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags; 

      if (this.collegeyOpportunitiesForm.valid) {
        this.isLoading   = true;
        this.show_loader = true;

        if (this.mode === Mode.Create) {
          this.mentorService.createCollegeyOpportunities(formData).subscribe(
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
                'Add Collegey Opportunities faild',
                'error'
              );
            },
            () => {
              reject();
            }
          );
        } else {
         // console.log(formData);
          this.mentorService.updateCollegeyOpportunities(formData, this.id).subscribe(
            (res) => {
              this.show_loader       = false;
              this.isLoading         = false;
              Swal.fire({
                title: 'Successful',
                text: 'Update Collegey Opportunities Succesfully',
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
    for (const i in this.collegeyOpportunitiesForm.controls) {
      this.collegeyOpportunitiesForm.controls[i].markAsDirty();
      this.collegeyOpportunitiesForm.controls[i].updateValueAndValidity();
    }
  }


}

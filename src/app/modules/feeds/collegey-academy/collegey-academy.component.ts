import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-academy',
  templateUrl: './collegey-academy.component.html',
  styleUrls: ['./collegey-academy.component.css']
})
export class CollegeyAcademyComponent implements OnInit {

  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;
  academyForm:FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private feedService: FeedService,
    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  // academyForm = this.fb.group({
  //   academyTitle: [null, Validators.required],
  //   academyDescription: [null, Validators.required],
  //   academyBtnText: [null, Validators.required],
  //   academyLink: [null, Validators.required],
  // })

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

  createForm() {
    this.academyForm = this.fb.group(
      {
        academyTitle: [null, Validators.required],
        academySubTitle: [null, Validators.required],
        academyDescription: [null, Validators.required],
        academyBtnText: [null, Validators.required],
        academyLink: [null, Validators.required],
        questionTitle: [null, Validators.required],
      },
    );
    this.academyForm.valueChanges.subscribe(() => {
    });
  }


  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {

    this.pageContent = pageContent;
    this.academyForm.patchValue({
      academyTitle: pageContent?.collegeyAcademy[0]?.academyTitle,
      academySubTitle: pageContent?.collegeyAcademy[0]?.academySubTitle,
      academyDescription: pageContent?.collegeyAcademy[0]?.academyDescription,
      academyBtnText: pageContent?.collegeyAcademy[0]?.academyBtnText,
      academyLink: pageContent?.collegeyAcademy[0]?.academyLink,
      questionTitle: pageContent?.collegeyAcademy[0]?.questionTitle,
    });
    this.markAllTouched();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.academyForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.academyForm.value;
          this.feedService.createAcademicBoxData(obj).subscribe(
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
          let obj = this.academyForm.value;
          
          this.feedService.updateAcademicBoxData(obj,this.id).subscribe(
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
    for (const i in this.academyForm.controls) {
      this.academyForm.controls[i].markAsDirty();
      this.academyForm.controls[i].updateValueAndValidity();
    }
  }
}

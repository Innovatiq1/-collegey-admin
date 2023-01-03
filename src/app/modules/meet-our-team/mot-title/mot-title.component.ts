import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { MeetOurTeamService } from 'src/app/core/services/meet-our-team.service';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-mot-title',
  templateUrl: './mot-title.component.html',
  styleUrls: ['./mot-title.component.css']
})
export class MotTitleComponent implements OnInit {

  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;
  titleForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private motService: MeetOurTeamService,

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

  createForm() {
    this.titleForm = this.fb.group(
      {
        mainTitle: [null, Validators.required],
        subTitle1: [null, Validators.required],
        subTitle2: [null, Validators.required],
        // status: [null, Validators.required],
      },
    );
    this.titleForm.valueChanges.subscribe(() => {
    });
  }

  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {   
    this.pageContent = pageContent;
    
    this.titleForm.patchValue({
      mainTitle: pageContent?.mainTitle,
      subTitle1: pageContent?.subTitle1,
      subTitle2: pageContent?.subTitle2,
      // status: pageContent?.status,
    });
    this.markAllTouched();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.titleForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.titleForm.value;
          this.motService.createMotTitle(obj).subscribe(
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
          let obj = this.titleForm.value;
          
          this.motService.updateMotTitle(obj,this.id).subscribe(
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
    for (const i in this.titleForm.controls) {
      this.titleForm.controls[i].markAsDirty();
      this.titleForm.controls[i].updateValueAndValidity();
    }
  }

}

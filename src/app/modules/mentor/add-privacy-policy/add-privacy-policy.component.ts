import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzModalRef } from 'ng-zorro-antd';
import referralCodeGenerator from 'referral-code-generator';
import Swal from 'sweetalert2';

// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-privacy-policy',
  templateUrl: './add-privacy-policy.component.html',
  styleUrls: ['./add-privacy-policy.component.css']
})
export class AddPrivacyPolicyComponent implements OnInit {

  aggrementForm: FormGroup;
  mode: String;
  id: any; 
  resource : any;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
  ){ 
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchResource();
    } else {
      // this.isSpinning = false;
    }
  }

  fetchResource() {
    let obj = {id:this.id}
    this.mentorService.getPrivacyInfo(obj).subscribe(
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
    this.aggrementForm.patchValue({
      title: resource?.data?.title,
      description: resource?.data?.description,
      status: resource?.data?.isDeleted === false ? true : false
    });
    this.markAllTouched();
  }

  createForm() {
    this.aggrementForm = this.fb.group(
      {
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
        status: ["", [Validators.required]],
      },
    );
    // this.coursesFromArray.push(this.fb.group([]));
    this.aggrementForm.valueChanges.subscribe(() => {
      
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.aggrementForm.valid) {
        if (this.mode === Mode.Create) {
          this.mentorService.createNewPrivacy(this.aggrementForm.value).subscribe(
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
                'Add Privacy faild',
                'error'
              );
            },
            () => {
              reject();
            }
          );
        } else {
          console.log(this.aggrementForm.value);
          this.mentorService.updatePrivacy(this.aggrementForm.value, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update Privacy Succesfully',
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
    for (const i in this.aggrementForm.controls) {
      this.aggrementForm.controls[i].markAsDirty();
      this.aggrementForm.controls[i].updateValueAndValidity();
    }
  }

}

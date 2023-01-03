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
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-reward-redeemed-setting',
  templateUrl: './add-reward-redeemed-setting.component.html',
  styleUrls: ['./add-reward-redeemed-setting.component.css']
})
export class AddRewardRedeemedSettingComponent implements OnInit {

  rewardSettingForm: FormGroup;
  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
    this.rewardSettingForm.patchValue({
      redeemed_allow: pageContent?.redeemed_allow,
      redeemed_value: pageContent?.redeemed_value,
    });
    this.markAllTouched();
  }

  createForm() {
    this.rewardSettingForm = this.fb.group(
      {
        redeemed_allow: ["", [Validators.required]],
        redeemed_value: ["", [Validators.required]],
      },
    );
    this.rewardSettingForm.valueChanges.subscribe(() => {
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.rewardSettingForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.rewardSettingForm.value;

          this.userService.createRedeemSettingData(obj).subscribe(
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
          let obj = this.rewardSettingForm.value;
          this.userService.updateRedeemSettingData(obj,this.id).subscribe(
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
    for (const i in this.rewardSettingForm.controls) {
      this.rewardSettingForm.controls[i].markAsDirty();
      this.rewardSettingForm.controls[i].updateValueAndValidity();
    }
  }

}

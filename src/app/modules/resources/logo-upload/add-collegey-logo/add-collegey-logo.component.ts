import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploadcollegelogo } from 'src/app/core/models/uploadlogo.model';
import { NzModalRef } from 'ng-zorro-antd';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-add-collegey-logo',
  templateUrl: './add-collegey-logo.component.html',
  styleUrls: ['./add-collegey-logo.component.css']
})
export class AddCollegeyLogoComponent implements OnInit {
  isLoading = false;
  uploadcollegelogoForm: FormGroup;
  uploadcollegelogo: Uploadcollegelogo;
  documentList = [];
  imageSource = ImageSource;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private uploadlogoService: UploadlogoService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddCollegeyLogoComponent>,
    private modal: NzModalRef,
  ) {
  }

  initUploadCollegeLogoForm() {
    this.uploadcollegelogoForm = this.fb.group({
      title: [this.uploadcollegelogo ? this.uploadcollegelogo.title : null, Validators.required],
      imageName: [this.uploadcollegelogo ? this.uploadcollegelogo.imageName : null],
    });

    if(this.uploadcollegelogo?.imageName) {
      this.documentList.push(this.uploadcollegelogo.imageName);
    }

  }

  onFileUpload(list) {
    this.uploadcollegelogoForm.patchValue({
      imageName: list[0],
    });
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      if (this.uploadcollegelogoForm.invalid) {
        return;
      }
      let formData = this.uploadcollegelogoForm.getRawValue();
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.uploadcollegelogo) {
        this.saveUploadCollegeLogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateUploadCollegeLogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateUploadCollegeLogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.updateUploadCollegeLogo(formData, this.uploadcollegelogo._id).subscribe(
        (uploadcollegelogo) => {
          Swal.fire('Successful', 'Logo updated successfully', 'success');
          this.isLoading = false;
          resolve(uploadcollegelogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update logo',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }

  saveUploadCollegeLogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.saveUploadCollegeLogo(formData).subscribe(
        (uploadcollegelogo) => {
          Swal.fire('Successful', 'Logo upload succesfully', 'success');
          this.isLoading = false;
          resolve(uploadcollegelogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to upload logo', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.initUploadCollegeLogoForm();
  }
  cancel() {
    this.modal.destroy();
  }

}
